# Gestion de rendu du devoir
## Description du projet
-Le projet vise à créer une plateforme permettant aux étudiants de soumettre leurs devoirs par matière et aux professeurs de les noter directement. Il est composé de trois espaces distincts : un espace dédié à l'administration, un espace réservé aux professeurs et un espace réservé aux étudiants.

## Contribution
### 05-Cédric
- Authentification avec JWT
- Drag and drop pour rendre un devoir non rendus en rendu
- Affichage des Assignments dans deux onglets séparés
- Amélioration du design du projet
- CRUD professeur, CRUD matière , CRUD assignment
- Page des listes et d'ajout de chaque modèle
- Filtre des devoirs par matière
- upload des fichiers pour chaque modèle
- api

### 09-Tsiory
- Application des filtres et gestion des vues selon le rôle de l'utilisateur connecté( Admin, professeur ou étudiant)
- api
- pages des mise à jours de chaque modèle
- Ajout des informations du détails dans l' Assignement
- Ajout preview pdf dans l' Assignement
- gestion des erreurs dans l'app
- Déploiement et hébergement sur Render
- Vidéo de démonstration

## Mise en place du projet sur votre machine
### Back
- Copier le code sur le lien sur git: https://github.com/Cedric0407/assignment-api.git
- Executer la commande "npm install"
- Démarrer le serveur "node server.js"

### Front
- Copier le code sur le  lien sur git: https://github.com/Cedric0407/assignment-app.git
- Executer la commande "npm install"
- Lancer le projet "ng serve"
    Pour tester l' application, on a mis ces login:
- Login en tant qu' admin: admin@admin.com mdp:123456
- Login en tant qu' étudiant: tsiory@tsiory.com mdp:123456
- Login en tant que prof: richard@richard.com mdp:123456

### Remarque
- Le preview pdf ne marche pas si vous avez un logiciel de téléchargement tel que IDM sur votre machine

# Lien de la vidéo démo:
https://drive.google.com/file/d/1Fg6UgodqlKKIskqJzASsgCHrV4ZfelU3/view?usp=sharing


# AssignmentApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

