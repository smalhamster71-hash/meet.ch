# meet.ch — Prototype MVP

But : prototype initial de meet.ch (inscription, profil minimal, infra dev).

Contenu du dépôt :
- docker-compose.yml : PostgreSQL + Redis (dev)
- schema.sql : schéma SQL minimal
- .env.example : variables d'environnement
- backend/ : serveur Node.js (Express) minimal avec endpoint /api/register

Prérequis (dev) :
- Docker & docker-compose
- Node.js 18+
- PostgreSQL accessible (ou lancer via docker-compose)

Démarrage rapide :
1. Copier `.env.example` -> `.env` et ajuster.
2. Démarrer PostgreSQL : `docker-compose up -d`
3. Initialiser la DB : exécuter le fichier `schema.sql` sur la base `meetch`.
4. Lancer le backend :
   - cd backend
   - npm install
   - npm run dev
5. Tester : GET http://localhost:4000/health

Notes :
- Ceci est un prototype minimal. À produire ensuite : validation, gestion erreurs complète, JWT, refresh tokens, envoi d'emails, stockage d'images, tests, etc.
- Licence : MIT (modifiable).