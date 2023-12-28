import { Component, OnInit} from '@angular/core';              // Importe les décorateurs 'Component' et 'OnInit' d'Angular Core.
import { Observable } from 'rxjs';                          // Importe 'Observable' de la bibliothèque RxJS pour la gestion des données asynchrones.
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';   // Importe l'interface 'OlympicCountry' pour définir la structure des données olympiques.
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-home',                                         // Sélecteur CSS pour utiliser ce composant.   Utilisé dans le HTML comme <app-home></app-home>.
  templateUrl: './home.component.html',                         // Chemin vers le fichier de template HTML de ce composant
  styleUrls: ['./home.component.scss'],                         // Chemin(s) vers le(s) fichier(s) de style CSS/SCSS de ce composant.
})

export class HomeComponent implements OnInit {                  // Déclaration de la classe du composant 'HomeComponent'.
  public olympics$: Observable<OlympicCountry[] | null> | undefined;  // Déclaration d'une propriété publique 'olympics$'. C'est un Observable qui émettra soit un tableau de 'OlympicCountry', soit 'null'. Peut être 'undefined' initialement.
  public chartData: any[] = [];  // Stocke les données transformées pour le diagramme
  public tooltipTemplate: any; // Assurez-vous de déclarer la propriété tooltipTemplate.
  numberOfJOs: number = 0;
  numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}        // Le constructeur est utilisé pour l'injection de dépendances.

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      map((countries: OlympicCountry[] | null) => {
        if (countries) {
          this.numberOfJOs = this.calculateNumberOfJOs(countries);
          this.numberOfCountries = countries.length;
          this.chartData = countries.map((country) => ({
            name: country.country,
            value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
          }));
        }
        return countries || [];
      })
    );
  }

  private calculateNumberOfJOs(countries: OlympicCountry[]): number {
    const yearsOfJOs: number[] = [];
    countries.forEach((olympic) => {
      olympic.participations.forEach((participation) => {
        if (!yearsOfJOs.includes(participation.year)) {
          yearsOfJOs.push(participation.year);
        }
      });
    });
    return yearsOfJOs.length;
  }

  onPieChartClick(event: any): void {
    const countryName = event.data.name;
    this.router.navigate(['/details', countryName]);
  }

  onChartClick(event: any): void {
    if (event && event.name) {
      this.router.navigate([`/details/${event.name}`]);
    }
  }

  tooltipText = (item: any): string => {
    const label = item.data.name;
    const val = item.data.value;
    return `${label} ${val}`;
  };
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