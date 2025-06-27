import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Point d'entrée principal de l'app
// Configure et démarre le serveur
async function bootstrap() {
  // Créer l'instance de l'app
  const app = await NestFactory.create(AppModule);

 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       
    forbidNonWhitelisted: true, 
    transform: true,        

  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,              
  });

  // Définit le port du serveur
  const port = process.env.PORT || 3001;
  
  // Démarre le serveur
  await app.listen(port);
  
  // Affiche un message de confirmation
  console.log(`🚀 Serveur démarré sur le port ${port}`);
  console.log(`📚 API disponible sur http://localhost:${port}`);
  console.log(`🏥 Health check sur http://localhost:${port}/health`);
}

// Lance l'application
bootstrap(); 