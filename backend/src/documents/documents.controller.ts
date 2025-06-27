import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';

// Contrôleur pour gérer les requêtes HTTP liées aux documents
// Pour créer, récupérer, mettre à jour et supprimer les documents
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // Endpoint POST /documents/:candidateId
  // Permet d'ajouter un document à un candidat spécifique
  @Post(':candidateId')
  async create(
    @Param('candidateId', ParseIntPipe) candidateId: number,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    // Appel le service pour créer le document
    const document = await this.documentsService.create(candidateId, createDocumentDto);
    
    // Vérifie si c'est un titre de séjour pour l'alerte
    const isTitreSejour = document.type === 'TITRE_SEJOUR';
    
    // Retourne la réponse avec l'information sur l'alerte
    return {
      document,
      alert: isTitreSejour ? {
        type: 'TITRE_SEJOUR',
        message: 'Attention : Un titre de séjour a été ajouté',
        show: true
      } : null
    };
  }

  // Endpoint GET /documents/candidate/:candidateId
  // Permet de récupérer tous les documents d'un candidat
  @Get('candidate/:candidateId')
  async findByCandidate(@Param('candidateId', ParseIntPipe) candidateId: number) {
    return this.documentsService.findByCandidate(candidateId);
  }

  // Endpoint GET /documents/:id
  // Permet de récupérer un document spécifique par son ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.findOne(id);
  }

  // Endpoint PUT /documents/:id/status
  // Permet de mettre à jour le statut d'un document
  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.updateStatus(id, updateDocumentDto);
  }

  // Endpoint DELETE /documents/:id
  // Permet de supprimer un document
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.remove(id);
  }
} 