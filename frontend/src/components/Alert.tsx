import React from 'react';
import { Alert as AlertType } from '@/types';

// Interface pour les props du composant Alert
interface AlertProps {
  alert: AlertType | null; // L'alerte à afficher (peut être null)
  onClose?: () => void;    // Fonction optionnelle pour fermer l'alerte
}

// Composant Alert pour afficher les notifications importantes
const Alert: React.FC<AlertProps> = ({ alert, onClose }) => {
  // N'affiche rien si aucune alerte n'est fournie
  if (!alert || !alert.show) {
    return null;
  }

  // Détermine le style de l'alerte selon son type
  const getAlertStyle = () => {
    switch (alert.type) {
      case 'TITRE_SEJOUR':
        return {
          container: 'bg-warning-50 border border-warning-500 text-warning-700',
          icon: 'text-warning-500',
          button: 'text-warning-500 hover:text-warning-700'
        };
      default:
        return {
          container: 'bg-blue-50 border border-blue-500 text-blue-700',
          icon: 'text-blue-500',
          button: 'text-blue-500 hover:text-blue-700'
        };
    }
  };

  const styles = getAlertStyle();

  return (
    <div className={`p-4 mb-4 rounded-lg border ${styles.container}`} role="alert">
      <div className="flex items-start">
        {/* Icône d'alerte */}
        <div className={`flex-shrink-0 w-5 h-5 mt-0.5 ${styles.icon}`}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Message d'alerte */}
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">
            {alert.message}
          </p>
        </div>
        
        {/* Bouton Close */}
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 ${styles.button} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning-500`}
            aria-label="Fermer l'alerte"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert; 