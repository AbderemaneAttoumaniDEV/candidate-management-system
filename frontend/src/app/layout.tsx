import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

// Police Inter (Google Fonts)
const inter = Inter({ subsets: ['latin'] });

// Métadonnées
export const metadata: Metadata = {
  title: 'Gestionnaire de Candidats',
  description: 'Système de gestion des documents candidats',
};

// Composant pour l'indicateur de mode démo
function DemoIndicator() {
  if (typeof window === 'undefined') return null;
  
  const isDemoMode = window.location.hostname === 'abderemaneattoumanidev.github.io' || 
                     window.location.hostname.includes('github.io');
  
  if (!isDemoMode) return null;
  
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm">
            <strong>Mode Démonstration :</strong> Cette version utilise des données de démonstration. 
            Les modifications ne sont pas sauvegardées.
          </p>
        </div>
      </div>
    </div>
  );
}

// Layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* En-tête */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                Gestionnaire de Candidats
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Indicateur de mode démo */}
        <DemoIndicator />

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center text-sm text-gray-500">
              © 2025 Abdérémane ATTOUMANI - Développé avec Next.js et NestJS
            </div>
          </div>
        </footer>

        {/* Config notif */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 