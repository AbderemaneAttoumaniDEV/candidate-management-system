import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CandidatesModule } from './candidates/candidates.module';
import { DocumentsModule } from './documents/documents.module';

// Module principal de l'app NestJS, import des modules et configure l'app
@Module({
  imports: [
    PrismaModule,        // Gestion de la base de données
    CandidatesModule,    // Gestion des candidats
    DocumentsModule,     // Gestion des documents
  ],
  controllers: [AppController], // Contrôleur principal 
  providers: [AppService],      // Service principal
})
export class AppModule {} 