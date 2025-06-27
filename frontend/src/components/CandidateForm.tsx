import React, { useState } from 'react';
import { CreateCandidateData } from '@/types';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';

// Interface pour les props du composant CandidateForm
interface CandidateFormProps {
  onSuccess: () => void; // Fonction appelée après la création d'un candidat
}

// Formulaire pour créer un nouveau candidat
const CandidateForm: React.FC<CandidateFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<CreateCandidateData>({
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  // Gère le chargement pendant la soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gère les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Element à valider pour soumettre le formulaire
  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      toast.error('Le prénom est obligatoire');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Le nom est obligatoire');
      return false;
    }
    if (!formData.birthDate) {
      toast.error('La date de naissance est obligatoire');
      return false;
    }
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Valider le formulaire
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Appel d'API pour créer le candidat
      const response = await apiService.createCandidate(formData);
      
      // Message de succès
      toast.success('Candidat créé avec succès !');
      
      // Affiche une alerte si le candidat a un titre de séjour
      if (response.alert) {
        toast(response.alert.message, {
          icon: '⚠️',
          duration: 5000,
        });
      }

      // Réinitialiser après la création d'un candidat
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
      });

      // Appel de la fonction succès pour rafraîchir la liste
      onSuccess();

    } catch (error) {
      // Gère les erreurs
      console.error('Erreur lors de la création du candidat:', error);
      toast.error('Erreur lors de la création du candidat');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Créer un nouveau candidat
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Entrez le prénom"
            required
          />
        </div>

        {/* Nom */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Entrez le nom"
            required
          />
        </div>

        {/* Date de naissance */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance *
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? 'Création en cours...' : 'Créer le candidat'}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm; 