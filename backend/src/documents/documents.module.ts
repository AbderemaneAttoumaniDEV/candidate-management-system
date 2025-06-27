import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

// Module pour organiser les fonctionnalités liées aux documents
// Ce module regroupe le service et le contrôleur des documents
@Module({
  controllers: [DocumentsController], // Contrôleur pour gérer les requêtes HTTP
  providers: [DocumentsService],      // Service pour la logique métier
  exports: [DocumentsService],        // Exporter le service pour qu'il soit utilisable dans d'autres modules
})
export class DocumentsModule {} 