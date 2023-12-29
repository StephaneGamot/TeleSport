import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[] | null> | undefined;
  public chartData: any[] = [];
  public tooltipTemplate: any;
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.olympicService.loadInitialData().pipe(
      map((countries: OlympicCountry[]) => {
        // ... traitement des données ...
        return countries;
      }),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (countries) => {
        if (countries) {
          this.numberOfJOs = this.calculateNumberOfJOs(countries);
          this.numberOfCountries = countries.length;
          this.chartData = countries.map(country => ({
            name: country.country,
            value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
          }));
        }
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load data: ' + (error.message || 'Unknown error');
      }
    });
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

* 
Ce composant, en résumé, est conçu pour afficher des données olympiques en s'abonnant à un service qui les fournit via un Observable.

*/