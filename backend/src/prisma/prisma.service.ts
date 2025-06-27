import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Service Prisma qui gère la connexion à la BDD
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      // Config client avec logs en mode développement
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  // Méthode appelée au démarrage du module
  // Établit la connexion à la BDD
  async onModuleInit() {
    await this.$connect();
  }

  // Méthode appelée à l'arrêt du module
  // Ferme proprement la connexion à la BDD
  async onModuleDestroy() {
    await this.$disconnect();
  }
} 