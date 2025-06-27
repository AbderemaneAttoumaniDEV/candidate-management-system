import { Injectable } from '@nestjs/common';

// Service principal
@Injectable()
export class AppService {
  // Retour d'un message de bienvenue
  getHello(): string {
    return 'Bienvenue sur l\'API de gestion des candidats !';
  }
} 