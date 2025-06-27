#!/bin/bash

echo "🚀 Démarrage du système de gestion de candidats..."

# Vérifie si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifie si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

echo "📦 Construction et démarrage des conteneurs..."
docker-compose up --build -d

echo "⏳ Attente du démarrage des services..."
sleep 10

echo "✅ Services démarrés avec succès !"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📚 Documentation API: http://localhost:3001/api"
echo ""
echo "Pour arrêter les services: docker-compose down"
echo "Pour voir les logs: docker-compose logs -f" 