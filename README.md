# Système de Gestion de Candidats

Un système complet de gestion de candidats avec gestion de documents, développé avec Next.js, NestJS et PostgreSQL

## 🚀 Fonctionnalités

### Gestion des Candidats
- ✅ Création, modification et suppression de candidats
- ✅ Recherche et filtrage des candidats
- ✅ Pagination des résultats
- ✅ Validation des données
- ✅ Interface intuitive avec formulaires

### Gestion des Documents
- ✅ Ajout de documents par type (CNI, Titre de séjour, RIB, etc.)
- ✅ Gestion des statuts (En cours, Validé, Refusé)
- ✅ Suppression de documents avec confirmation
- ✅ Alertes automatiques pour les titres de séjour expirés
- ✅ Interface de gestion intégrée

### Interface Utilisateur
- ✅ Interface moderne et responsive avec Tailwind CSS
- ✅ Notifications toast pour les actions utilisateur
- ✅ Confirmation pour les actions destructives
- ✅ Design cohérent et professionnel
- ✅ Composants réutilisables et modulaires

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique pour la robustesse
- **Tailwind CSS** - Framework CSS utilitaire pour un design moderne
- **React Hot Toast** - Notifications utilisateur élégantes
- **Axios** - Client HTTP pour les appels API
- **date-fns** - Manipulation des dates

### Backend
- **NestJS** - Framework Node.js avec architecture modulaire
- **TypeScript** - Typage statique pour la sécurité
- **PostgreSQL** - Base de données relationnelle robuste
- **Prisma** - ORM moderne pour la gestion de la base de données
- **Class Validator** - Validation des données côté serveur
- **Swagger** - Documentation API automatique

## 🚀 Installation et Démarrage

### Option 1 : Démarrage Rapide avec Docker

#### Prérequis
- Docker et Docker Compose installés

#### Démarrage Automatique

**Sur Linux/Mac :**
```bash
chmod +x start.sh
./start.sh
```

**Sur Windows :**
```cmd
start.bat
```

#### Démarrage Manuel avec Docker
```bash
# Construire et démarrer tous les services
docker-compose up --build -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

### Option 2 : Installation Manuelle

#### Prérequis
- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn

#### 1. Configuration de la Base de Données

Créez une base de données PostgreSQL :

```sql
CREATE DATABASE candidate_manager;
```

#### 2. Configuration du Backend

```bash
cd backend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Modifier .env avec vos paramètres de base de données

# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate dev

# Démarrer en mode développement
npm run start:dev
```

#### 3. Configuration du Frontend

```bash
cd frontend
npm install

# Démarrer en mode développement
npm run dev
```

## 🌐 Accès à l'Application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001
- **Documentation API** : http://localhost:3001/api
- **Base de données** : localhost:5432

## 📚 API Endpoints

### Candidats

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/candidates` | Liste des candidats avec pagination |
| `POST` | `/candidates` | Créer un candidat |
| `GET` | `/candidates/:id` | Détails d'un candidat |
| `PUT` | `/candidates/:id` | Modifier un candidat |
| `DELETE` | `/candidates/:id` | Supprimer un candidat |

### Documents

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/documents/candidate/:candidateId` | Documents d'un candidat |
| `POST` | `/documents/:candidateId` | Ajouter un document |
| `PUT` | `/documents/:id/status` | Modifier le statut d'un document |
| `DELETE` | `/documents/:id` | Supprimer un document |

## 🎯 Fonctionnalités Spéciales

### Alertes Automatiques
- Détection automatique des titres de séjour expirés
- Alertes visuelles lors de l'ajout de nouveaux documents
- Notifications toast pour informer l'utilisateur

### Validation des Données
- Validation côté client et serveur
- Messages d'erreur personnalisés et informatifs
- Prévention des doublons de documents
- Validation des types de documents

### Interface Responsive
- Design adaptatif pour mobile et desktop
- Navigation intuitive et accessible
- Feedback visuel pour toutes les actions
- Composants modulaires et réutilisables

### Gestion des Documents
- Types de documents prédéfinis (CNI, Titre de séjour, RIB, etc.)
- Statuts de validation (En cours, Validé, Refusé)
- Suppression sécurisée avec confirmation
- Interface de gestion intégrée

## 🔧 Scripts Disponibles

### Backend
```bash
npm run start:dev    # Développement avec hot reload
npm run build        # Compilation TypeScript
npm run start:prod   # Production
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
npx prisma studio    # Interface graphique pour la base de données
```

### Frontend
```bash
npm run dev          # Développement
npm run build        # Build de production
npm run start        # Démarrage production
npm run lint         # Vérification du code
```

### Docker
```bash
docker-compose up -d          # Démarrer les services
docker-compose down           # Arrêter les services
docker-compose logs -f        # Voir les logs
docker-compose restart        # Redémarrer les services
```

## 📝 Notes de Développement

### Architecture
- **Frontend** : Architecture basée sur les composants avec séparation des responsabilités
- **Backend** : Architecture modulaire avec NestJS et injection de dépendances
- **Base de données** : Relations bien définies avec contraintes d'intégrité via Prisma

### Sécurité
- Validation des données côté serveur avec class-validator
- Protection contre les injections SQL (Prisma ORM)
- Gestion appropriée des erreurs et exceptions
- Validation des types TypeScript

### Performance
- Pagination côté serveur pour les grandes listes
- Optimisation des requêtes SQL avec Prisma
- Lazy loading des composants React
- Cache des requêtes API

### Qualité du Code
- Code TypeScript typé pour la robustesse
- Tests unitaires et d'intégration
- Documentation automatique avec Swagger
- Linting et formatting automatiques

## 🐛 Dépannage

### Problèmes Courants

**Erreur de connexion à la base de données :**
```bash
# Vérifier que PostgreSQL est démarré
# Vérifier les paramètres de connexion dans .env
```

**Erreur CORS :**
```bash
# Vérifier que le backend est accessible sur le bon port
# Vérifier la configuration CORS dans le backend
```

**Problèmes Docker :**
```bash
# Nettoyer les conteneurs et images
docker-compose down -v
docker system prune -a
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
Développé dans le cadre d'un test technique pour une alternance en développement web.
