# Leeral

Application web statique de calcul de facture Senelec, développée en JavaScript pur avec routage client, pages modulaires et gestion d'authentification simple.

## Déploiement

Site en ligne : https://leeral.vercel.app/

## Structure du projet

- `index.html` : point d'entrée principal
- `src/` : code source JavaScript et styles
  - `app.js` : initialisation de l'application
  - `router.js` : gestion du routage par hash
  - `pages/` : pages de l'application (`Intro`, `Login`, `Register`, `Home`, `Calculator`, `Statistics`, `History`, `NotFound`)
  - `store/` : état global applicatif
  - `services/` : services métier (authentification, facturation, etc.)
  - `database/` : configuration de la base IndexedDB locale
  - `styles/` : feuilles de style CSS par page
- `assets/` : images, logos et autres ressources
- `data/` : données statiques (`tariffs.json`)

## Installation / usage

Ce projet est conçu comme une application statique. Il peut être exécuté depuis un serveur local ou directement déployé sur Vercel.

### Option 1 : exécution locale simple

1. Ouvrir `index.html` dans un navigateur.

### Option 2 : serveur local

1. Lancer un serveur HTTP dans le dossier du projet, par exemple :

```bash
cd /chemin/vers/leeral
python3 -m http.server 8000
```

2. Ouvrir `http://localhost:8000`

## Prérequis

- Navigateur moderne avec support des modules ES6
- Aucune compilation nécessaire

## Notes

- Le routeur utilise le `hash` dans l'URL pour la navigation.
- Les données de tarification sont chargées depuis `data/tariffs.json`.
- Assure-toi que tous les fichiers d'assets référencés existent avant le déploiement.
