import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';

// Module pour organiser les fonctionnalités des candidats
@Module({
  controllers: [CandidatesController], // Contrôleur pour gérer les requêtes HTTP
  providers: [CandidatesService],      // Service pour la logique métier
  exports: [CandidatesService],        // Exporter le service pour qu'il soit utilisable dans d'autres modules
})
export class CandidatesModule {} 