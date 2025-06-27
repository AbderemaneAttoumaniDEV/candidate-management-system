import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Contrôleur principal de l'app, gère les routes de base de l'API
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint GETvérifie le fonctionnement de l'API
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Endpoint GET /healthn vérification de l'API
  @Get('health')
  getHealth(): object {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'API de gestion des candidats opérationnelle'
    };
  }
} 