import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

// DTO (Data Transfer Object) pour la création d'un candidat
// Ce DTO définit la structure des données attendues lors de la création d'un candidat
// et inclut des validations pour s'assurer que les données sont correctes
export class CreateCandidateDto {
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  firstName: string; // Prénom du candidat

  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  lastName: string; // Nom de famille du candidat

  @IsDateString({}, { message: 'La date de naissance doit être au format ISO' })
  @IsNotEmpty({ message: 'La date de naissance est obligatoire' })
  birthDate: string; // Date de naissance au format ISO (ex: "1990-01-01")
} 