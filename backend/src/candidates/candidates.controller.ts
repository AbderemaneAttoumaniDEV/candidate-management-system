import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { UpdateCandidateDto } from '../dto/update-candidate.dto';

// Gère les requêtes HTTP liées aux candidats
// Expose les endpoints REST pour créer, récupérer, modifier et supprimer les candidats
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  // Endpoint POST /candidates
  // Créer un nouveau candidat
  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    // Appel le service pour créer le candidat
    const candidate = await this.candidatesService.create(createCandidateDto);
    
    // Vérifie si le candidat a un titre de séjour pour l'alerte
    const hasTitreSejour = await this.candidatesService.hasTitreSejour(candidate.id);
    
    // Retourne la réponse avec l'info sur l'alerte
    return {
      candidate,
      alert: hasTitreSejour ? {
        type: 'TITRE_SEJOUR',
        message: 'Attention : Ce candidat a un titre de séjour',
        show: true
      } : null
    };
  }

  // Endpoint GET /candidates
  // Récupère tous les candidats avec leurs documents
  @Get()
  async findAll() {
    // Récupère tous les candidats
    const candidates = await this.candidatesService.findAll();
    
    // Vérifie s'il a un titre de séjour
    const candidatesWithAlerts = await Promise.all(
      candidates.map(async (candidate) => {
        const hasTitreSejour = await this.candidatesService.hasTitreSejour(candidate.id);
        return {
          candidate, // Retourne le candidat dans une propriété candidate
          alert: hasTitreSejour ? {
            type: 'TITRE_SEJOUR',
            message: 'Attention : Ce candidat a un titre de séjour',
            show: true
          } : null
        };
      })
    );
    
    return candidatesWithAlerts;
  }

  // Endpoint GET /candidates/:id
  // Récupère un candidat spécifique par son ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // Récupère le candidat par son ID
    const candidate = await this.candidatesService.findOne(id);
    
    // Vérifie s'il a un titre de séjour
    const hasTitreSejour = await this.candidatesService.hasTitreSejour(candidate.id);
    
    // Retourne la réponse avec l'info sur l'alerte
    return {
      candidate,
      alert: hasTitreSejour ? {
        type: 'TITRE_SEJOUR',
        message: 'Attention : Ce candidat a un titre de séjour',
        show: true
      } : null
    };
  }

  // Endpoint PUT /candidates/:id
  // Permet de modifier un candidat existant
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    // Appel le service pour modifier le candidat
    const candidate = await this.candidatesService.update(id, updateCandidateDto);
    
    // Vérifie s'il a un titre de séjour
    const hasTitreSejour = await this.candidatesService.hasTitreSejour(candidate.id);
    
    // Retourne la réponse avec l'info sur l'alerte
    return {
      candidate,
      alert: hasTitreSejour ? {
        type: 'TITRE_SEJOUR',
        message: 'Attention : Ce candidat a un titre de séjour',
        show: true
      } : null
    };
  }

  // Endpoint DELETE /candidates/:id
  // Permet de supprimer un candidat et tous ses documents associés
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.remove(id);
  }
} 