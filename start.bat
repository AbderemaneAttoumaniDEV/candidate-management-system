@echo off
echo 🚀 Démarrage du système de gestion de candidats...

REM Vérifier si Docker est installé
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker n'est pas installé. Veuillez installer Docker d'abord.
    pause
    exit /b 1
)

REM Vérifier si Docker Compose est installé
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord.
    pause
    exit /b 1
)

echo 📦 Construction et démarrage des conteneurs...
docker-compose up --build -d

echo ⏳ Attente du démarrage des services...
timeout /t 10 /nobreak >nul

echo ✅ Services démarrés avec succès !
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:3001
echo 📚 Documentation API: http://localhost:3001/api
echo.
echo Pour arrêter les services: docker-compose down
echo Pour voir les logs: docker-compose logs -f
pause 