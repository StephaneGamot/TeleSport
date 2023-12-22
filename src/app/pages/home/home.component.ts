import { Component, OnInit } from '@angular/core';              // Importe les décorateurs 'Component' et 'OnInit' d'Angular Core.
import { Observable, of } from 'rxjs';                          // Importe 'Observable' de la bibliothèque RxJS pour la gestion des données asynchrones.
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';   // Importe l'interface 'OlympicCountry' pour définir la structure des données olympiques.

@Component({
  selector: 'app-home',                                         // Sélecteur CSS pour utiliser ce composant.   Utilisé dans le HTML comme <app-home></app-home>.
  templateUrl: './home.component.html',                         // Chemin vers le fichier de template HTML de ce composant
  styleUrls: ['./home.component.scss'],                         // Chemin(s) vers le(s) fichier(s) de style CSS/SCSS de ce composant.
})

export class HomeComponent implements OnInit {                  // Déclaration de la classe du composant 'HomeComponent'.
  public olympics$: Observable<OlympicCountry[] | null> | undefined;  // Déclaration d'une propriété publique 'olympics$'. C'est un Observable qui émettra soit un tableau de 'OlympicCountry', soit 'null'. Peut être 'undefined' initialement.



  constructor(private olympicService: OlympicService) {}        // Le constructeur est utilisé pour l'injection de dépendances.

  ngOnInit(): void {                                            // La méthode 'ngOnInit' est un hook de cycle de vie d'Angular exécuté après la création du composant.
    this.olympics$ = this.olympicService.getOlympics();         // Lors de l'initialisation, s'abonner aux données olympiques fournies par 'olympicService'.
  }                                                             // Assignation de l'Observable retourné par 'getOlympics()' à la propriété 'olympics$'.
}

/*

* Décorateur @Component : Définit les métadonnées du composant, telles que le template HTML, le style, et le sélecteur.
* Classe du Composant : Définit le comportement du composant, incluant les propriétés et les méthodes.
*	Observable olympics$ : Gère les données asynchrones des pays olympiques.
*	Injection de OlympicService : Fournit les données nécessaires au composant
* ngOnInit : Initialise le composant en s'abonnant aux données olympiques

* Le symbole $ après le nom olympics dans olympics$ est une convention de nommage couramment utilisée dans la communauté Angular et RxJS pour indiquer qu'une variable est un Observable.

Ce composant, en résumé, est conçu pour afficher des données olympiques en s'abonnant à un service qui les fournit via un Observable.

*/