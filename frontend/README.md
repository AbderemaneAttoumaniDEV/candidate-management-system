# Frontend - Application de Gestion des Candidats

Application Next.js avec React et TypeScript pour la gestion des documents candidats

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend NestJS en cours d'exécution sur le port 3001

### 1. Installation des dépendances

```bash
npm install
```

### 2. Démarrage de l'application

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🎨 Fonctionnalités

### ✅ Fonctionnalités implémentées

- **Création de candidats** : Formulaire pour saisir nom, prénom et date de naissance
- **Gestion des documents** : Support pour tous les types de documents requis
- **Statuts des documents** : Affichage des statuts (En cours, Validé, Refusé)
- **Listing des candidats** : Affichage de tous les candidats avec leurs documents
- **Alerte titre de séjour** : Notification spéciale pour les titres de séjour
- **Interface moderne** : Design responsive avec Tailwind CSS
- **Notifications** : Système de notifications avec react-hot-toast

### 📋 Types de documents supportés

- **CNI** - Carte Nationale d'Identité
- **Titre de séjour** - Titre de séjour (déclenche une alerte)
- **RIB** - Relevé d'Identité Bancaire
- **Justificatif de domicile** - Justificatif de domicile
- **Carte Vitale** - Carte Vitale

### 🚨 Alerte spéciale

L'application affiche automatiquement une alerte visuelle lorsqu'un candidat a un titre de séjour :

- Alerte visible dans la liste des candidats
- Notification toast lors de la création
- Design distinctif avec icône d'avertissement

## 🏗️ Architecture

### Structure des composants

```
src/
├── app/                 # Pages Next.js (App Router)
│   ├── globals.css     # Styles globaux
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Page d'accueil
├── components/         # Composants React
│   ├── Alert.tsx       # Composant d'alerte
│   ├── CandidateForm.tsx # Formulaire de création
│   └── CandidateList.tsx # Liste des candidats
├── services/           # Services API
│   └── api.ts         # Service Axios
└── types/             # Types TypeScript
    └── index.ts       # Définitions des types
```

### Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Axios** - Client HTTP pour les appels API
- **react-hot-toast** - Notifications toast
- **date-fns** - Manipulation des dates

## 🎯 Composants principaux

### CandidateForm
- Formulaire de création de candidat
- Validation des champs obligatoires
- Gestion des erreurs et succès
- Notifications utilisateur

### CandidateList
- Affichage de tous les candidats
- Gestion des états de chargement et d'erreur
- Affichage des documents par candidat
- Intégration des alertes titre de séjour

### Alert
- Composant d'alerte réutilisable
- Styles conditionnels selon le type
- Support pour la fermeture

## 🔧 Configuration

### Variables d'environnement

L'application se connecte par défaut au backend sur `http://localhost:3001`. Pour modifier cette URL, vous pouvez créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Styles

Les styles sont gérés avec Tailwind CSS et des classes utilitaires personnalisées dans `globals.css`.

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :

- **Mobile** : Interface optimisée pour les petits écrans
- **Tablet** : Layout adapté pour les tablettes
- **Desktop** : Interface complète pour les grands écrans

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

### Variables d'environnement de production

Assurez-vous de configurer les variables d'environnement appropriées pour la production.

## 📝 Notes pour le développeur

- Le code est entièrement commenté en français
- Utilisation de TypeScript strict pour la sécurité des types
- Gestion d'erreur centralisée avec Axios interceptors
- Composants modulaires et réutilisables
- Interface utilisateur intuitive et accessible 