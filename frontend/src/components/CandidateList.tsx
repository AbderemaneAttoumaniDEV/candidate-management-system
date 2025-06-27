import React, { useState, useEffect } from 'react';
import { Candidate, Document, DocumentType, DocumentStatus, ApiResponse } from '@/types';
import { apiService } from '@/services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import Alert from './Alert';
import DocumentManager from './DocumentManager';
import CandidateEditForm from './CandidateEditForm';

// Composant pour afficher la liste des candidats avec leurs documents
// Ce composant récupère et affiche tous les candidats avec leurs informations et documents
const CandidateList: React.FC = () => {
  // État pour stocker la liste des candidats
  const [candidates, setCandidates] = useState<ApiResponse<Candidate>[]>([]);
  
  // État pour gérer le chargement
  const [isLoading, setIsLoading] = useState(true);
  
  // État pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  // État pour gérer l'édition d'un candidat
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  // Fonction pour récupérer la liste des candidats depuis l'API
  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Appeler l'API pour récupérer tous les candidats
      const data = await apiService.getCandidates();
      setCandidates(data);
      
    } catch (error) {
      console.error('Erreur lors du chargement des candidats:', error);
      setError('Erreur lors du chargement des candidats');
      toast.error('Erreur lors du chargement des candidats');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer un candidat
  const handleDeleteCandidate = async (candidate: Candidate) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le candidat "${candidate.firstName} ${candidate.lastName}" ? Cette action supprimera également tous ses documents.`)) {
      return;
    }

    try {
      await apiService.deleteCandidate(candidate.id);
      toast.success('Candidat supprimé avec succès !');
      fetchCandidates(); // Rafraîchir la liste
    } catch (error) {
      console.error('Erreur lors de la suppression du candidat:', error);
      toast.error('Erreur lors de la suppression du candidat');
    }
  };

  // Fonction pour obtenir le nom lisible d'un type de document
  const getDocumentTypeLabel = (type: DocumentType): string => {
    const labels: Record<DocumentType, string> = {
      [DocumentType.CNI]: 'Carte Nationale d\'Identité',
      [DocumentType.TITRE_SEJOUR]: 'Titre de séjour',
      [DocumentType.RIB]: 'RIB',
      [DocumentType.JUSTIFICATIF_DOMICILE]: 'Justificatif de domicile',
      [DocumentType.CARTE_VITALE]: 'Carte Vitale',
    };
    return labels[type];
  };

  // Fonction pour obtenir la couleur du statut d'un document
  const getStatusColor = (status: DocumentStatus): string => {
    switch (status) {
      case DocumentStatus.VALIDE:
        return 'bg-success-100 text-success-800 border-success-200';
      case DocumentStatus.REFUSE:
        return 'bg-danger-100 text-danger-800 border-danger-200';
      case DocumentStatus.EN_COURS:
      default:
        return 'bg-warning-100 text-warning-800 border-warning-200';
    }
  };

  // Fonction pour obtenir le texte du statut
  const getStatusLabel = (status: DocumentStatus): string => {
    switch (status) {
      case DocumentStatus.VALIDE:
        return 'Validé';
      case DocumentStatus.REFUSE:
        return 'Refusé';
      case DocumentStatus.EN_COURS:
      default:
        return 'En cours';
    }
  };

  // Fonction pour formater une date
  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
    } catch {
      return 'Date invalide';
    }
  };

  // Charger les candidats au montage du composant
  useEffect(() => {
    fetchCandidates();
  }, []);

  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Chargement des candidats...</span>
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-danger-600 mb-4">{error}</p>
        <button
          onClick={fetchCandidates}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Afficher un message si aucun candidat
  if (candidates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Aucun candidat trouvé.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Liste des candidats ({candidates.length})
      </h2>
      
      {/* Liste des candidats */}
      <div className="grid gap-6">
        {candidates.map((candidateResponse) => {
          const candidate = candidateResponse.candidate!;
          
          return (
            <div key={candidate.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Alerte pour titre de séjour */}
              {candidateResponse.alert && (
                <Alert alert={candidateResponse.alert} />
              )}
              
              {/* Informations du candidat */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {candidate.firstName} {candidate.lastName}
                  </h3>
                  
                  {/* Boutons d'action */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCandidate(candidate)}
                      className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
                      title="Modifier ce candidat"
                    >
                    Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteCandidate(candidate)}
                      className="px-3 py-1 bg-danger-600 text-white text-sm rounded-md hover:bg-danger-700 transition-colors"
                      title="Supprimer ce candidat"
                    >
                    Supprimer
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium">Date de naissance :</span> {formatDate(candidate.birthDate)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Créé le :</span> {formatDate(candidate.createdAt)}
                </p>
              </div>

              {/* Formulaire d'édition (si en mode édition) */}
              {editingCandidate?.id === candidate.id && (
                <div className="mb-6">
                  <CandidateEditForm
                    candidate={candidate}
                    onCancel={() => setEditingCandidate(null)}
                    onSuccess={() => {
                      setEditingCandidate(null);
                      fetchCandidates();
                    }}
                  />
                </div>
              )}

              {/* Gestionnaire de documents */}
              <DocumentManager
                candidateId={candidate.id}
                documents={candidate.documents}
                onDocumentsChange={fetchCandidates}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateList; 