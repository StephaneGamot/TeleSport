import { Component, OnInit } from '@angular/core';         // Importe les décorateurs 'Component' et 'OnInit' d'Angular Core.
import { take } from 'rxjs';                               // Importe l'opérateur 'take' de RxJS, utilisé pour limiter le nombre de valeurs émises par un Observable.
import { OlympicService } from './core/services/olympic.service'; // Importe votre service personnalisé 'OlympicService'.

@Component({                                               // Décorateur 'Component' pour définir les métadonnées de votre composant.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {              // Déclaration de la classe du composant 'AppComponent'.
  constructor(private olympicService: OlympicService) {}   // Le constructeur est utilisé pour l'injection de dépendances. Ici injection du service 'OlympicService' dans le composant.

  ngOnInit(): void {                                       // La méthode 'ngOnInit' est un hook de cycle de vie d'Angular exécuté après la création du composant.
    this.olympicService.loadInitialData()                  // Appel de la méthode 'loadInitialData' du service OlympicService.
    .pipe(take(1))                                         // Utilise 'take(1)' pour s'assurer que l'Observable émet une valeur une seule fois, puis se termine.
    .subscribe();                                          // Démarre l'Observable et déclenche l'opération de chargement des données initiales.
  }
}
