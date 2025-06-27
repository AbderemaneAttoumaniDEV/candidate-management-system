import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DocumentType } from '@prisma/client';

// DTO pour la création d'un document
// Ce DTO définit la structure des données attendues lors de la création d'un document
export class CreateDocumentDto {
  @IsEnum(DocumentType, { message: 'Le type de document doit être valide' })
  @IsNotEmpty({ message: 'Le type de document est obligatoire' })
  type: DocumentType; // Type de document (CNI, TITRE_SEJOUR, RIB, etc.)

  @IsString({ message: 'Le nom du fichier doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom du fichier est obligatoire' })
  fileName: string; // Nom du fichier uploadé

  @IsString({ message: 'Le chemin du fichier doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le chemin du fichier est obligatoire' })
  filePath: string; // Chemin vers le fichier sur le serveur
} 