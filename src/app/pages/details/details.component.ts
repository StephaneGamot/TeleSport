import { Component, OnInit, OnDestroy } from '@angular/core';           // Importe les décorateurs Component et OnInit d'Angular
import { Subscription } from 'rxjs';                    
import { OlympicService } from "src/app/core/services/olympic.service"; // Importe OlympicService de vos services
import { OlympicCountry } from "src/app/core/models/Olympic";           // Importe le modèle OlympicCountry
import { ActivatedRoute, Router } from "@angular/router";               // Importe ActivatedRoute et Router pour la gestion des routes
import { Observable } from "rxjs";                                      // Importe Observable de RxJS

@Component({                                     // Décorateur Component qui définit les métadonnées pour le composant DetailsComponent
	selector: "app-details",                       // Sélecteur CSS utilisé pour identifier ce composant dans le template HTML
	templateUrl: "./details.component.html",       // Chemin vers le fichier de template HTML pour ce composant
	styleUrls: ["./details.component.scss"],       // Chemin(s) vers le(s) fichier(s) de styles pour ce composant
})
export class DetailsComponent implements OnInit, OnDestroy {                    // On va implémenter l'interface OnInit d'Angular
	                                                                   // On déclare les propriétés publiques de la classe avec des valeurs initiales
    private subscriptions = new Subscription();
    public countryName: string = "";                                   // Je déclare, initialise à 0, stocke le nom du pays sélectionné
	public numberOfEntries: number = 0;                                // Je déclare, initialise à 0, stocke le compte du nombre de participations olympiques
	public totalNumberMedals: number = 0;                              // Je déclare, initialise à 0, stocke le compte du nombre total de médailles gagnées
	public totalNumberOfAthletes: number = 0;                          // Je déclare, initialise, stocke le compte du le nombre total d'athlètes
	public countryData: any = null;                                    // On stocke les données détaillées du pays
	public chartData: any[] = [];                                      // On stocke les données pour le graphique ngx-charts
	public olympics$: Observable<OlympicCountry[] | null> | undefined; // Observable pour les données olympiques
	public xAxisLabels: string[] = [];                                 // Labels pour l'axe X du graphique
	public olympicCountry?: OlympicCountry;                            // Type facultatif pour les données du pays olympique
    public allCountryNames: string[] = [];
	public isLoading: boolean = false;
	public errorMessage: string | null = null;

	constructor(                                   // Constructeur de la classe DetailsComponent
    private activatedRoute: ActivatedRoute,      // On injecte ActivatedRoute pour accéder aux paramètres de l'itinéraire
    private olympicService: OlympicService,      // On injecte OlympicService pour accéder aux données et aux méthodes liées aux Jeux Olympiques
    private router: Router) {}                   // On injecte Router pour la navigation entre les différentes routes/pages de l'application

	ngOnInit(): void {
		this.isLoading = true;
		this.olympicService.getOlympics().subscribe({
		  next: (countries) => {
			if (countries) {
			  this.allCountryNames = countries.map(country => country.country);
			  this.activatedRoute.params.subscribe(params => {
				this.countryName = params['countryName'];
				if (!this.isValidCountry(this.countryName)) {
				  this.router.navigate(['/404']);
				} else {
				  this.loadCountryData();
				}
			  });
			}
		  },
		   error: (error) => {
        console.error('Error loading data:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load data: ' + (error.message || 'Unknown error');
      }
		});
	  }
	  
	  

  ngOnDestroy(): void {
     
      this.subscriptions.unsubscribe();
  }

private isValidCountry(countryName: string): boolean {
  return this.allCountryNames.includes(countryName);
}

	navigateBackHome(): void {                                // Méthode d'un bouton pour naviguer vers la page d'accueil
		this.router.navigate(["/"]);                            // J'utilise le service router pour naviguer vers la racine ("/")
	}

	ngAfterViewInit(): void {                                 // ngAfterViewInit est un hook du cycle de vie appelé après l'initialisation de la vue du composant
		this.olympicService.loadInitialData().subscribe(() => { // Souscrit à la méthode loadInitialData de olympicService ???
			this.loadCountryData();                               // On appelle loadCountryData pour charger et traiter les données du pays
		}
		);
	}

	private loadCountryData(): void {
		// Début du chargement
		this.isLoading = true;
	  
		// Appel du service pour obtenir les données du pays
		this.olympicService.getCountryData(this.countryName)
		  .subscribe({
			next: (data: OlympicCountry | null) => {
			  if (data && data.participations && data.participations.length > 0) {
				// Traitement des données reçues
				this.countryData = data;
				this.numberOfEntries = data.participations.length;
				this.totalNumberMedals = data.participations.reduce((total, participation) => total + participation.medalsCount, 0);
				this.totalNumberOfAthletes = data.participations.reduce((total, participation) => total + participation.athleteCount, 0);
	  
				// Calcul des données pour le graphique
				this.calculateChartData();
			  } else {
				// Si aucune donnée ou participation n'est trouvée
				this.errorMessage = 'No data or participations found for ' + this.countryName;
			  }
			  // Fin du chargement
			  this.isLoading = false;
			},
			error: (error) => {
			  // En cas d'erreur
			  this.isLoading = false;
			  console.error('Error loading country data:', error);
			  this.errorMessage = 'Failed to load data: ' + (error.message || 'Unknown error');
			  // Fin du chargement
			 
			}
		  });
	  }
	  

/*
	private loadCountryData(): void {
		this.isLoading = true;
		this.olympicService.getCountryData(this.countryName)                // Appelle getCountryData sur olympicService du pays choisi
    .subscribe((data: OlympicCountry | null) => {                       // Cette méthode est utilisée pour s'abonner à un Observable ???
			console.log("Data for", this.countryName, data);                  // Affiche les données reçues pour le pays sélectionné

			if (data) {                                                       // On vérifie si les données (data) du pays sont disponibles
				this.countryData = data;                                        // Je stocke les données du pays dans countryData
				this.numberOfEntries =  0;                                      // Initialisation du nombre de participations du pays à 0
				this.totalNumberMedals = 0;                                     // Initialisation du total des médailles à 0
				this.totalNumberOfAthletes = 0;                                 // Initialisation du total des athlètes à 0

				if (data.participations && data.participations.length > 0) {    // On vérifie si le pays a des participations
					data.participations.forEach((participation: any) => {         // Si oui je parcours chaque participation du pays
						this.numberOfEntries = data.participations.length;          // Mise à jour du nombre total d'entrées (participations)
						this.totalNumberMedals += participation.medalsCount;        // Mise à jour du nombre total de médailles en les additionnant
						this.totalNumberOfAthletes += participation.athleteCount;   // Mise à jour du nombre total d'athletes en les additionnant
						console.log("Participation Data:", participation);          // J'affiche les données de chaque participation dans la console
					});
				}

				this.calculateChartData();                                      // J'appelle calculateChartData pour mettre à jour le graphique avec les nouvelles données
			}
		});
	}
*/
	private calculateChartData(): void {                                  // Définit la méthode utilisé pour le graphique
		if (this.countryData && this.countryData.participations) {          // Vérifie si countryData et ses participations sont définies  
			const medalsByYear: { [year: string]: number } = {};              // Création d'un objet pour stocker le nombre de médailles par année

			this.countryData.participations.forEach((participation: any) => { // Je parcours chaque participation dans countryData
				const year = participation.year.toString();                     // Convertion de l'année en lettres (string)
				const medalsCount = participation.medalsCount;                  // Je récupère le nombre de médailles de la participation

				if (!medalsByYear[year]) {                                      // Si l'année n'est pas encore dans "medalsByYear", je l'ajoute avec le nombre de médailles
					medalsByYear[year] = medalsCount;
				} else {                                                        // Si l'année existe déjà, j'ajoute le nombre de médailles à l'entrée existante
					medalsByYear[year] += medalsCount;
				}
				console.log("Medals By Year (Current Iteration):", medalsByYear);
			});

			let series = Object.keys(medalsByYear).map((year) => {            // Convertion de medalsByYear en un tableau de séries pour ngx-charts !!
				return { name: year, value: medalsByYear[year] };               // Création d'un objet pour chaque année avec son nom et le nombre de médailles pour ngx-charts !!
			});

			this.chartData = [{ name: "Médailles", series: series }];         // Mise à jour pour le format attendu par ngx-charts!! - Un tableau avec un objet contenant le nom de la série et le tableau des séries

			this.xAxisLabels = series.map((dataPoint) => dataPoint.name);     // Mise à jour xAxisLabels avec les noms (années) des points de données

			console.log("Chart Data:", this.chartData);                       // Affiche chartData dans la console
			console.log("X-Axis Labels:", this.xAxisLabels);                  // Affiche xAxisLabels dans la console
		} else {
			this.chartData = [];                                              // Si countryData ou ses participations ne sont pas définis, alors on initialise chartData à un tableau vide
		}
	}
}

/*
* Component, OnInit : Permettent d'utiliser les fonctionnalités de base des composants Angular et le hook de cycle de vie ngOnInit.
* OlympicService : Service personnalisé pour gérer les opérations liées aux données olympiques.
* OlympicCountry : Modèle de données définissant la structure d'un objet pays olympique.
* ActivatedRoute, Router : Fournissent des fonctionnalités pour interagir avec les routes de l'application (par exemple, lire les paramètres d'URL ou naviguer vers une autre page).
* Observable : Fait partie de RxJS, utilisé pour gérer des données asynchrones, comme les réponses des appels HTTP.
* Décorateur @Component : Indique à Angular que la classe qui suit est un composant Angular.
    Il fournit des métadonnées de configuration pour le composant, telles que son sélecteur, le fichier de template et les fichiers de style.

* Constructeur : C'est une méthode spéciale qui est exécutée automatiquement lors de la création d'une instance de la classe. Dans Angular, il est couramment utilisé pour l'injection de dépendances.
* .subscribe() : Cette méthode est utilisée pour s'abonner à un Observable. Les Observable sont au cœur de la programmation réactive et sont utilisés pour gérer des flux de données asynchrones, comme les réponses des requêtes HTTP dans Angular.
* ngOnInit: Utilisé pour initialiser le composant. Ici, il récupère le nom du pays à partir des paramètres de l'URL et le stocke dans une propriété.
* ngAfterViewInit: S'assure que les données initiales sont chargées après que la vue du composant soit complètement initialisée.

* Utilisation de setTimeout : Dans ngOnInit, j'ai utilisé setTimeout pour retarder la vérification jusqu'à ce que les données des pays soient chargées. Cela est nécessaire car getOlympics() est asynchrone et peut ne pas avoir terminé de charger les données au moment où isValidCountry est appelée.
*/