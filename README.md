# Gestion de rendu du devoir
## Contribution
### 05-Cédric
- Authentification à l'aide de JSON du login
- Drag and drop entre la liste des Assignments non rendus et rendus
- Affichage des Assignments dans deux onglets séparés
- Amélioration du design du projet
- Ajout matière et d' autres propriétés sur les Assignements
- Filtre matière et devoir (app)
- Edition et suppression des assignements (app)

### 09-Tsiory
- Ajout des filtres, filtre par id pour les matières, filtre étudiant/matière pour les devoirs
- Edition de l' Assignement (api)
- Ajout des informations du détails dans l' Assignement
- Ajout preview pdf dans l' Assignement
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
- Le preview pdf ne marche pas si vous avez un IDM sur votre machine

# Lien de la vidéo démo


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

