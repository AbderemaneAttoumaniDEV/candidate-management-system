import { IsEnum, IsNotEmpty } from 'class-validator';
import { DocumentStatus } from '@prisma/client';

// DTO pour la mise à jour du statut d'un document
// Ce DTO permet de modifier uniquement le statut de validation d'un document
export class UpdateDocumentDto {
  @IsEnum(DocumentStatus, { message: 'Le statut doit être valide' })
  @IsNotEmpty({ message: 'Le statut est obligatoire' })
  status: DocumentStatus; // Nouveau statut du document (EN_COURS, VALIDE, REFUSE)
} 