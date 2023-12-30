import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ChartData } from 'src/app/core/models/chart-data.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> | undefined;
  public chartData: ChartData[] = [];
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  public chartView: [number, number] = [700, 400];


  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.updateChartSize();
    window.onresize = () => this.updateChartSize();

    this.olympicService.loadInitialData().pipe(
      map((countries: OlympicCountry[]) => countries),
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

  private updateChartSize() {
    const maxWidth = 700;
    const widthRatio = 0.9; // 90% de la largeur de la fenêtre
    const aspectRatio = 0.5; // Ratio hauteur / largeur (par exemple, 0.5 pour un ratio de 2:1)
    const width = Math.min(window.innerWidth * widthRatio, maxWidth);
    const height = width * aspectRatio; // Calcule la hauteur en fonction du ratio
    this.chartView = [width, height];
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
  
  onChartClick(event: ChartData): void {
    if (event && event.name) {
      this.router.navigate([`/details/${event.name}`]);
    }
  }

  tooltipText = (item: ChartData): string => {
    const label = item.name;
    const val = item.value;
    return `${label} ${val}`;
  };
  

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
}