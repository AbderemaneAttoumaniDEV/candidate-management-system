# Guide de Contribution

Merci de votre intérêt pour contribuer au projet de Gestion de Candidats ! Ce document vous guidera à travers le processus de contribution.

## 🚀 Comment Contribuer

### 1. Fork et Clone

1. Fork ce repository sur GitHub
2. Clone votre fork localement :
   ```bash
   git clone https://github.com/votre-username/candidate_manager.git
   cd candidate_manager
   ```

### 2. Configuration de l'Environnement

Suivez les instructions d'installation dans le [README.md](README.md) pour configurer votre environnement de développement.

### 3. Créer une Branche

Créez une branche pour votre fonctionnalité ou correction :
```bash
git checkout -b feature/nom-de-la-fonctionnalite
# ou
git checkout -b fix/nom-du-bug
```

### 4. Développement

- Suivez les conventions de code du projet
- Écrivez des tests pour vos nouvelles fonctionnalités
- Assurez-vous que tous les tests passent
- Mettez à jour la documentation si nécessaire

### 5. Commit et Push

```bash
git add .
git commit -m "feat: ajouter une nouvelle fonctionnalité"
git push origin feature/nom-de-la-fonctionnalite
```

### 6. Pull Request

1. Allez sur GitHub et créez une Pull Request
2. Utilisez le template fourni
3. Décrivez clairement vos changements
4. Attendez la review

## 📋 Conventions de Code

### Commit Messages

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` pour les nouvelles fonctionnalités
- `fix:` pour les corrections de bugs
- `docs:` pour les changements de documentation
- `style:` pour les changements de formatage
- `refactor:` pour les refactorisations
- `test:` pour les ajouts de tests
- `chore:` pour les tâches de maintenance

### Code Style

#### Frontend (Next.js/React)
- Utilisez TypeScript
- Suivez les conventions ESLint et Prettier
- Utilisez des composants fonctionnels avec hooks
- Nommez les composants en PascalCase

#### Backend (NestJS)
- Utilisez TypeScript
- Suivez les conventions NestJS
- Utilisez les décorateurs appropriés
- Validez les données avec class-validator

### Tests

- Écrivez des tests unitaires pour les nouvelles fonctionnalités
- Assurez-vous que la couverture de tests reste élevée
- Utilisez des noms de tests descriptifs

## 🐛 Signaler un Bug

1. Vérifiez que le bug n'a pas déjà été signalé
2. Utilisez le template de bug report
3. Fournissez des étapes de reproduction claires
4. Incluez des captures d'écran si possible

## 💡 Proposer une Fonctionnalité

1. Vérifiez que la fonctionnalité n'a pas déjà été proposée
2. Utilisez le template de feature request
3. Décrivez clairement le problème et la solution
4. Expliquez pourquoi cette fonctionnalité serait utile

## 📝 Documentation

- Mettez à jour le README.md si nécessaire
- Documentez les nouvelles API endpoints
- Ajoutez des commentaires pour le code complexe

## 🔧 Outils de Développement

### Linting et Formatage

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
npm run format
```

### Tests

```bash
# Backend
cd backend
npm test
npm run test:watch

# Frontend
cd frontend
npm test
```

## 🤝 Code Review

- Soyez respectueux et constructif
- Posez des questions si quelque chose n'est pas clair
- Suggérez des améliorations de manière positive
- Remerciez les contributeurs pour leur travail

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet.

## 🆘 Besoin d'Aide ?

Si vous avez des questions ou besoin d'aide :
- Ouvrez une issue sur GitHub
- Consultez la documentation du projet
- Contactez les mainteneurs

Merci de contribuer ! 🎉 