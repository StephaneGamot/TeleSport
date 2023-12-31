import { Component, OnInit } from '@angular/core'; // Importe Component et OnInit de @angular/core pour la création de composants et la gestion du cycle de vie.

@Component({                                       // Décorateur Component pour définir la classe comme un composant Angular.
  selector: 'app-loader',                          // Définit le sélecteur CSS pour utiliser ce composant. <app-loader> pourra être utilisé dans le HTML.
  templateUrl: './loader.component.html',          // Spécifie le chemin vers le fichier HTML de ce composant.
  styleUrls: ['./loader.component.scss']           // Chemin vers les fichiers de styles SCSS pour ce composant.
})
export class LoaderComponent implements OnInit {   // Déclare la classe LoaderComponent et implémente l'interface OnInit pour la gestion du cycle de vie du composant.

  constructor() { }                                // Constructeur de la classe, pour l'instant vide. Ici, on peut injecter des dépendances si nécessaire.

  ngOnInit(): void {                               // Méthode ngOnInit, appelée par Angular après la création du composant. Bon endroit pour initialiser la logique du composant.
    
  }

}
// Cette méthode est vide pour l'instant, mais On peut y ajouter de la logique d'initialisation si nécessaire.