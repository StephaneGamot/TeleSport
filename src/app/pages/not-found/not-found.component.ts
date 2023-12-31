import { Component, OnInit } from '@angular/core'; // Importe les décorateurs 'Component' et 'OnInit' depuis le package @angular/core.

@Component({
  selector: 'app-not-found',                       // Définit le sélecteur du composant. Ce sélecteur est utilisé pour intégrer le composant dans d'autres templates HTML.
  templateUrl: './not-found.component.html',       // Indique le chemin vers le fichier HTML qui sert de template pour ce composant.
  styleUrls: ['./not-found.component.scss']        // Fournit les chemins vers les fichiers de styles SCSS spécifiques à ce composant.
})
export class NotFoundComponent implements OnInit { // Déclare la classe 'NotFoundComponent' et indique qu'elle implémente l'interface 'OnInit'.

  constructor() { }                                // Le constructeur de la classe. Actuellement, il est vide. C'est l'endroit où l'on injecterait des dépendances si nécessaire.

  ngOnInit(): void {                               // La méthode ngOnInit(). Elle fait partie du cycle de vie du composant et est appelée après la création du composant.
  }

}
