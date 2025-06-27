import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { DocumentType } from '@prisma/client';

// Service pour gérer les opérations sur les documents
// Pour créer, lire, mettre à jour et supprimer les documents
@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  // Créer un nouveau document pour un candidat
  async create(candidateId: number, createDocumentDto: CreateDocumentDto) {
    // Vérifie que le candidat existe
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new NotFoundException(`Candidat avec l'ID ${candidateId} non trouvé`);
    }

    // Créer le document en BDD
    return this.prisma.document.create({
      data: {
        type: createDocumentDto.type,
        fileName: createDocumentDto.fileName,
        filePath: createDocumentDto.filePath,
        candidateId: candidateId,
      },
      // Inclut les infos du candidat dans la réponse
      include: {
        candidate: true,
      },
    });
  }

  // Récupère tous les documents d'un candidat
  async findByCandidate(candidateId: number) {
    // Vérifie que le candidat existe
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new NotFoundException(`Candidat avec l'ID ${candidateId} non trouvé`);
    }

    // Récupère tous les documents du candidat
    return this.prisma.document.findMany({
      where: {
        candidateId: candidateId,
      },
      // Inclut les informations du candidat
      include: {
        candidate: true,
      },
      // Trie par date de création (plus récents en premier)
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // MAJ statut d'un document
  async updateStatus(id: number, updateDocumentDto: UpdateDocumentDto) {
    // Vérifie que le document existe
    const document = await this.prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException(`Document avec l'ID ${id} non trouvé`);
    }

    // MAJ statut du document
    return this.prisma.document.update({
      where: { id },
      data: {
        status: updateDocumentDto.status,
      },
      // Inclut les infos du candidat dans la réponse
      include: {
        candidate: true,
      },
    });
  }

  // Récupère document par son ID
  async findOne(id: number) {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        candidate: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Document avec l'ID ${id} non trouvé`);
    }

    return document;
  }

  // Supprime un document
  async remove(id: number) {
    // Vérifie que le document existe
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        candidate: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Document avec l'ID ${id} non trouvé`);
    }

    // Supprime le document
    await this.prisma.document.delete({
      where: { id },
    });

    // Retourne un message de confirmation
    return {
      message: `Document "${document.fileName}" supprimé avec succès`,
      deletedDocument: document,
    };
  }

  // Vérifie si un candidat a déjà un document d'un type spécifique
  async hasDocumentType(candidateId: number, type: DocumentType): Promise<boolean> {
    const document = await this.prisma.document.findFirst({
      where: {
        candidateId: candidateId,
        type: type,
      },
    });

    // Retourn true si un document de ce type existe déjà pour ce candidat
    return !!document;
  }
} 