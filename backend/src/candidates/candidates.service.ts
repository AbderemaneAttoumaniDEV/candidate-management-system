import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { UpdateCandidateDto } from '../dto/update-candidate.dto';
import { DocumentType } from '@prisma/client';

// Service pour gérer les opérations sur les candidats
// Logique pour créer, lire, modifier et supprimer les candidats
@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  // Créer un nouveau candidat
  async create(createCandidateDto: CreateCandidateDto) {
    // Conversion de la date de naissance de string vers Date
    const birthDate = new Date(createCandidateDto.birthDate);
    
    // Création du candidat en BDD avec Prisma
    return this.prisma.candidate.create({
      data: {
        firstName: createCandidateDto.firstName,
        lastName: createCandidateDto.lastName,
        birthDate: birthDate,
      },
      // Inclure les documents associés dans la réponse
      include: {
        documents: true,
      },
    });
  }

  // Retourne la liste complète des candidats avec leurs documents
  async findAll() {
    return this.prisma.candidate.findMany({
      // Inclut les documents associés pour chaque candidat
      include: {
        documents: {
          // Trie les documents par date de création (plus récents en premier)
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      // Trie les candidats par date de création (plus récents en premier)
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Récupère un candidat par son ID
  async findOne(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: {
        documents: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // Si candidat n'existe pas, lever une exception
    if (!candidate) {
      throw new NotFoundException(`Candidat avec l'ID ${id} non trouvé`);
    }

    return candidate;
  }

  // MAJ candidat existant
  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    // Vérifie que le candidat existe
    const existingCandidate = await this.prisma.candidate.findUnique({
      where: { id },
    });

    if (!existingCandidate) {
      throw new NotFoundException(`Candidat avec l'ID ${id} non trouvé`);
    }

    // Prépare les données de MAJ
    const updateData: any = {};
    
    if (updateCandidateDto.firstName !== undefined) {
      updateData.firstName = updateCandidateDto.firstName;
    }
    
    if (updateCandidateDto.lastName !== undefined) {
      updateData.lastName = updateCandidateDto.lastName;
    }
    
    if (updateCandidateDto.birthDate !== undefined) {
      updateData.birthDate = new Date(updateCandidateDto.birthDate);
    }

    // MAJ candidat en BDD
    return this.prisma.candidate.update({
      where: { id },
      data: updateData,
      // Inclut les documents associés dans la réponse
      include: {
        documents: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  // Supprime un candidat et tous ses documents associés
  async remove(id: number) {
    // Vérifie que le candidat existe
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (!candidate) {
      throw new NotFoundException(`Candidat avec l'ID ${id} non trouvé`);
    }

    // Supprime le candidat
    await this.prisma.candidate.delete({
      where: { id },
    });

    // Retourne un message de confirmation
    return {
      message: `Candidat "${candidate.firstName} ${candidate.lastName}" supprimé avec succès`,
      deletedCandidate: candidate,
    };
  }

  // Vérifie si un candidat a un titre de séjour
  async hasTitreSejour(candidateId: number): Promise<boolean> {
    const document = await this.prisma.document.findFirst({
      where: {
        candidateId: candidateId,
        type: DocumentType.TITRE_SEJOUR,
      },
    });

    // Retourne true si un titre de séjour existe pour ce candidat
    return !!document;
  }
} 