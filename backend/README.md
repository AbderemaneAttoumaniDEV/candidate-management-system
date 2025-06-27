# Backend - API de Gestion des Candidats

Backend NestJS avec Prisma et PostgreSQL pour la gestion des documents candidats

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- PostgreSQL installé et configuré
- npm ou yarn

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de la base de données

1. Créer une base de données PostgreSQL :
```bash
createdb candidate_manager
```

2. Copier le fichier d'environnement :
```bash
cp env.example .env
```

3. Modifier le fichier `.env` avec vos paramètres de base de données :
```env
DATABASE_URL="postgresql://username:password@localhost:5432/candidate_manager?schema=public"
PORT=3001
NODE_ENV=development
```

### 3. Configuration de Prisma

1. Générer le client Prisma :
```bash
npx prisma generate
```

2. Exécuter les migrations pour créer les tables :
```bash
npx prisma migrate dev --name init
```

3. (Optionnel) Seeder la base de données avec des données de test :
```bash
npm run db:seed
```

### 4. Démarrage du serveur

```bash
# Mode développement (avec hot reload)
npm run start:dev

# Mode production
npm run start:prod
```

Le serveur sera accessible sur `http://localhost:3001`

## 📚 API Endpoints

### Candidats

- `GET /candidates` - Récupérer tous les candidats
- `GET /candidates/:id` - Récupérer un candidat par ID
- `POST /candidates` - Créer un nouveau candidat

### Documents

- `GET /documents/candidate/:candidateId` - Récupérer les documents d'un candidat
- `GET /documents/:id` - Récupérer un document par ID
- `POST /documents/:candidateId` - Ajouter un document à un candidat
- `PUT /documents/:id/status` - Mettre à jour le statut d'un document

### Utilitaires

- `GET /` - Page d'accueil de l'API
- `GET /health` - Vérification de l'état de santé

## 🗄️ Structure de la base de données

### Table `candidates`
- `id` (Primary Key)
- `firstName` (String)
- `lastName` (String)
- `birthDate` (DateTime)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Table `documents`
- `id` (Primary Key)
- `type` (Enum: CNI, TITRE_SEJOUR, RIB, JUSTIFICATIF_DOMICILE, CARTE_VITALE)
- `status` (Enum: EN_COURS, VALIDE, REFUSE)
- `fileName` (String)
- `filePath` (String)
- `candidateId` (Foreign Key)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## 🔧 Scripts disponibles

- `npm run start:dev` - Démarrage en mode développement
- `npm run build` - Compilation du projet
- `npm run start:prod` - Démarrage en mode production
- `npm run db:seed` - Seeder la base de données
- `npm run lint` - Vérification du code avec ESLint

## 🚨 Fonctionnalités spéciales

### Alerte Titre de Séjour

L'API détecte automatiquement quand un candidat a un titre de séjour et retourne une alerte dans la réponse :

```json
{
  "candidate": { ... },
  "alert": {
    "type": "TITRE_SEJOUR",
    "message": "Attention : Ce candidat a un titre de séjour",
    "show": true
  }
}
```

## 🛠️ Technologies utilisées

- **NestJS** - Framework backend
- **Prisma** - ORM pour la base de données
- **PostgreSQL** - Base de données
- **TypeScript** - Langage de programmation
- **class-validator** - Validation des données
- **class-transformer** - Transformation des données

## 📝 Notes pour le développeur

- Tous les endpoints incluent une validation automatique des données
- Les erreurs sont gérées de manière uniforme avec des messages explicites
- CORS est configuré pour permettre les requêtes depuis le frontend Next.js
- Le code est entièrement commenté pour faciliter la compréhension 