import React, { useState } from 'react';
import { Candidate, UpdateCandidateData } from '@/types';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';

// Interface pour les props du composant CandidateEditForm
interface CandidateEditFormProps {
  candidate: Candidate;
  onCancel: () => void;
  onSuccess: () => void;
}

// Composant pour modifier les informations d'un candidat
const CandidateEditForm: React.FC<CandidateEditFormProps> = ({ 
  candidate, 
  onCancel, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState<UpdateCandidateData>({
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    birthDate: candidate.birthDate.split('T')[0] // Récupère la date sans l'heure
  });

  // Gère le chargement pendant la soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gère les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs
    if (!formData.firstName?.trim() || !formData.lastName?.trim() || !formData.birthDate) {
      toast.error('Tous les champs sont obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      // Appeler l'API pour mettre à jour le candidat
      const response = await apiService.updateCandidate(candidate.id, formData);
      
      toast.success('Candidat modifié avec succès !');
      
      // Afficher une alerte si c'est un titre de séjour
      if (response.alert) {
        toast(response.alert.message, {
          icon: '⚠️',
          duration: 5000,
        });
      }

      onSuccess(); // Fermer le formulaire et rafraîchir la liste

    } catch (error) {
      console.error('Erreur lors de la modification du candidat:', error);
      toast.error('Erreur lors de la modification du candidat');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Modifier le candidat
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prénom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Prénom du candidat"
            required
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Nom du candidat"
            required
          />
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance *
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {isSubmitting ? 'Modification...' : 'Modifier'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateEditForm; 