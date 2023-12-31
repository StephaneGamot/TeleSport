import { Component, OnInit } from '@angular/core';         // Importe 'Component' pour définir des composants et 'OnInit' pour les hooks de cycle de vie d'Angular.
import { OlympicService } from './core/services/olympic.service'; // Importe le service 'OlympicService' que vous avez créé pour gérer les données olympiques.

@Component({                                               // Utilise le décorateur 'Component' pour définir les métadonnées de votre composant.
  selector: 'app-root',                                    // Définit le sélecteur du composant, 'app-root', utilisé dans le HTML.
  templateUrl: './app.component.html',                     // Chemin vers le fichier HTML du composant.
  styleUrls: ['./app.component.scss'],                     // Chemins vers les fichiers SCSS pour les styles du composant.
})
export class AppComponent implements OnInit {              // Déclare la classe 'AppComponent' et implémente 'OnInit' pour le hook de cycle de vie.
  constructor(private olympicService: OlympicService) {}   // Constructeur qui injecte le service 'OlympicService'. 'private' rend le service disponible uniquement dans cette classe.

  ngOnInit(): void {                                       //  La méthode 'ngOnInit', appelée automatiquement par Angular après la création du composant.
    }
}
  // Ici, vous pouvez initialiser la logique du composant ou faire des appels de service.
  // Pour l'instant, cette méthode est vide mais prête à être utilisée pour les initialisations nécessaires.
 
  /*
  On peut ajouter la logique d'initialisation dans la méthode ngOnInit et utiliser le service OlympicService pour gérer les données ou les appels API nécessaires.
  */