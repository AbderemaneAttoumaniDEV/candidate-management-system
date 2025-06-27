'use client';

import React, { useState } from 'react';
import CandidateForm from '@/components/CandidateForm';
import CandidateList from '@/components/CandidateList';

// Page principale qui combine le formulaire de création et la liste des candidats
export default function Home() {
  // Force le rafraîchissement de la liste des candidats
  const [refreshKey, setRefreshKey] = useState(0);

  // Fonction appelée après la création réussie d'un candidat qui force le rafraîchissement de la liste
  const handleCandidateCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Section création de candidat */}
      <section>
        <CandidateForm onSuccess={handleCandidateCreated} />
      </section>

      {/* Section liste des candidats */}
      <section>
        <CandidateList key={refreshKey} />
      </section>
    </div>
  );
} 