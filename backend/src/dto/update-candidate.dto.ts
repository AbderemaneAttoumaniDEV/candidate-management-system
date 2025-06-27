import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

// DTO pour la mise à jour d'un candidat
// Ce DTO définit la structure des données nécessaires pour modifier un candidat
export class UpdateCandidateDto {
  // Prénom du candidat (optionnel pour la mise à jour)
  @IsOptional()
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le prénom ne peut pas être vide' })
  firstName?: string;

  // Nom de famille du candidat (optionnel pour la mise à jour)
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  lastName?: string;

  // Date de naissance du candidat (optionnel pour la mise à jour)
  @IsOptional()
  @IsDateString({}, { message: 'La date de naissance doit être une date valide' })
  birthDate?: string;
} 