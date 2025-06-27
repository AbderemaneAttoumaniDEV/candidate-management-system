import React, { useState } from 'react';
import { Document, DocumentType, DocumentStatus, CreateDocumentData, UpdateDocumentStatusData } from '@/types';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';

// Interface pour les props du composant DocumentManager
interface DocumentManagerProps {
  candidateId: number;
  documents: Document[];
  onDocumentsChange: () => void; // Fonction pour rafraîchir la liste
}

// Composant pour gérer les documents d'un candidat
const DocumentManager: React.FC<DocumentManagerProps> = ({ 
  candidateId, 
  documents, 
  onDocumentsChange 
}) => {
  // Gère l'affichage du formulaire d'ajout
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Gère les données du nouveau document
  const [newDocument, setNewDocument] = useState<CreateDocumentData>({
    type: DocumentType.CNI,
    fileName: '',
    filePath: ''
  });

  // Gère le chargement
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gère les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Ajout d'un document
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newDocument.fileName.trim()) {
      toast.error('Le nom du fichier est obligatoire');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'un chemin de fichier
      const documentData = {
        ...newDocument,
        filePath: `/uploads/${newDocument.fileName}`
      };

      const response = await apiService.createDocument(candidateId, documentData);
      
      toast.success('Document ajouté avec succès !');
      
      // Affiche une alerte si c'est un titre de séjour
      if (response.alert) {
        toast(response.alert.message, {
          icon: '⚠️',
          duration: 5000,
        });
      }

      // Réinitialise le formulaire
      setNewDocument({
        type: DocumentType.CNI,
        fileName: '',
        filePath: ''
      });
      
      setShowAddForm(false);
      onDocumentsChange(); // Rafraîchit la liste

    } catch (error) {
      console.error('Erreur lors de l\'ajout du document:', error);
      toast.error('Erreur lors de l\'ajout du document');
    } finally {
      setIsSubmitting(false);
    }
  };

  // MAJ du statut d'un document
  const handleUpdateStatus = async (documentId: number, newStatus: DocumentStatus) => {
    try {
      await apiService.updateDocumentStatus(documentId, { status: newStatus });
      toast.success('Statut mis à jour avec succès !');
      onDocumentsChange(); // Rafraîchir la liste
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  // Supprimer un document
  const handleDeleteDocument = async (documentId: number, fileName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le document "${fileName}" ?`)) {
      return;
    }

    try {
      await apiService.deleteDocument(documentId);
      toast.success('Document supprimé avec succès !');
      onDocumentsChange(); // Rafraîchir la liste
    } catch (error) {
      console.error('Erreur lors de la suppression du document:', error);
      toast.error('Erreur lors de la suppression du document');
    }
  };

  // Obtenir le nom lisible d'un type de document
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

  // Obtenir la couleur du statut
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

  // Obtenir le texte du statut
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

  return (
    <div className="space-y-4">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-700">
          Documents ({documents.length})
        </h4>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
        >
          {showAddForm ? 'Annuler' : '+ Ajouter un document'}
        </button>
      </div>

      {/* Formulaire d'ajout de document */}
      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md">
          <form onSubmit={handleAddDocument} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Type de document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de document *
                </label>
                <select
                  name="type"
                  value={newDocument.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value={DocumentType.CNI}>Carte Nationale d'Identité</option>
                  <option value={DocumentType.TITRE_SEJOUR}>Titre de séjour</option>
                  <option value={DocumentType.RIB}>RIB</option>
                  <option value={DocumentType.JUSTIFICATIF_DOMICILE}>Justificatif de domicile</option>
                  <option value={DocumentType.CARTE_VITALE}>Carte Vitale</option>
                </select>
              </div>

              {/* Nom du fichier */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du fichier *
                </label>
                <input
                  type="text"
                  name="fileName"
                  value={newDocument.fileName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="ex: document.pdf"
                  required
                />
              </div>

              {/* Bouton de soumission */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700'
                  }`}
                >
                  {isSubmitting ? 'Ajout...' : 'Ajouter'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Liste des documents */}
      {documents.length === 0 ? (
        <p className="text-gray-500 italic">Aucun document ajouté</p>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {getDocumentTypeLabel(document.type)}
                </p>
                <p className="text-sm text-gray-600">
                  {document.fileName}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Sélecteur de statut */}
                <select
                  value={document.status}
                  onChange={(e) => handleUpdateStatus(document.id, e.target.value as DocumentStatus)}
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(document.status)}`}
                >
                  <option value={DocumentStatus.EN_COURS}>En cours</option>
                  <option value={DocumentStatus.VALIDE}>Validé</option>
                  <option value={DocumentStatus.REFUSE}>Refusé</option>
                </select>

                {/* Bouton de suppression */}
                <button
                  onClick={() => handleDeleteDocument(document.id, document.fileName)}
                  className="px-2 py-1 bg-danger-600 text-white text-xs rounded-md hover:bg-danger-700 transition-colors"
                  title="Supprimer ce document"
                >
                Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentManager; 