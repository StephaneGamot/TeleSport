import { Component, OnInit, OnDestroy, HostListener } from '@angular/core'; // Importe les décorateurs Component, OnDestroy, HostListener et OnInit d'Angular
import { Subscription } from 'rxjs';                    
import { OlympicService } from "src/app/core/services/olympic.service"; // Importe OlympicService de vos services
import { OlympicCountry } from "src/app/core/models/Olympic";           // Importe le modèle OlympicCountry
import { ActivatedRoute, Router } from "@angular/router";               // Importe ActivatedRoute et Router pour la gestion des routes
import { Observable } from "rxjs";                                      // Importe Observable de RxJS
import { ChartData } from 'src/app/core/models/chart-data.interface';
import { Participation } from 'src/app/core/models/Participation';

@Component({                                       // Décorateur Component qui définit les métadonnées pour le composant DetailsComponent
	selector: "app-details",                       // Sélecteur CSS utilisé pour identifier ce composant dans le template HTML
	templateUrl: "./details.component.html",       // Chemin vers le fichier de template HTML pour ce composant
	styleUrls: ["./details.component.scss"],       // Chemin(s) vers le(s) fichier(s) de styles pour ce composant
})
export class DetailsComponent implements OnInit, OnDestroy {           // On va implémenter l'interface OnInit d'Angular
	                                                                   // On déclare les propriétés publiques de la classe avec des valeurs initiales
	private subscriptions: Subscription = new Subscription()           // C'est une instance de Subscription de RxJS pour gérer les abonnements aux observables.
    public countryName: string = "";                                   // Je déclare, initialise à 0, stocke le nom du pays sélectionné
	public numberOfEntries: number = 0;                                // Je déclare, initialise à 0, stocke le compte du nombre de participations olympiques
	public totalNumberMedals: number = 0;                              // Je déclare, initialise à 0, stocke le compte du nombre total de médailles gagnées
	public totalNumberOfAthletes: number = 0;                          // Je déclare, initialise, stocke le compte du le nombre total d'athlètes
	public countryData: OlympicCountry | null = null;                  // On stocke les données détaillées du pays
	public chartData: ChartData[] = [];                                // On stocke les données pour le graphique ngx-charts
	public olympics$: Observable<OlympicCountry[]> | undefined;        // Observable pour les données olympiques
	public xAxisLabels: string[] = [];                                 // Labels pour l'axe X du graphique
	public olympicCountry?: OlympicCountry;                            // Type facultatif pour les données du pays olympique
    public allCountryNames: string[] = [];                             //C'est un tableau qui stockera les noms de tous les pays.
	public isLoading: boolean = false;                                 // C'est un booléen indiquant si des données sont en cours de chargement.
	public errorMessage: string | null = null;                         // Il stocke un message d'erreur ou null s'il n'y a pas d'erreur.
	public chartView: [number, number] = [700, 400];                   // C'est un tuple représentant la taille du graphique.

	constructor(                                 // Constructeur de la classe DetailsComponent
    private activatedRoute: ActivatedRoute,      // On injecte ActivatedRoute pour accéder aux paramètres de l'itinéraire
    private olympicService: OlympicService,      // On injecte OlympicService pour accéder aux données et aux méthodes liées aux Jeux Olympiques
    private router: Router) {}                   // On injecte Router pour la navigation entre les différentes routes/pages de l'application

	ngOnInit(): void {
		this.isLoading = true;                                                  // Active le loader de chargement. Cela affiche le loader dans l'interface utilisateur.
	
		this.updateChartSize();                                                 // Appelle la méthode updateChartSize pour ajuster la taille du graphique basée sur la taille actuelle de la fenêtre du navigateur.
		this.subscriptions=
		this.olympicService.getOlympics().subscribe({                           // Démarre un abonnement à l'Observable retourné par getOlympics() de OlympicService.
		  next: (countries) => {                                                // Fonction 'next' appelée avec les données reçues (ici, la liste des pays olympiques).
			if (countries) {                                                    // Vérifie si la liste des pays n'est pas vide.
			  this.allCountryNames = countries.map(country => country.country); // Transforme la liste des données des pays en une liste de noms de pays.
	console.log(1);
			  this.activatedRoute.params.subscribe(params => {                  // S'abonne aux changements des paramètres de l'itinéraire actuel.
				this.countryName = params['countryName'];                       // Récupère le nom du pays à partir des paramètres de l'itinéraire.
	
				if (this.isValidCountry(this.countryName)) {                   // Vérifie si le nom du pays récupéré est valide en utilisant la méthode isValidCountry.
					this.loadCountryData(); 
					console.log(2);
					
				} else {
					this.isLoading = false;
					this.errorMessage = 'Invalid country name.';
					this.router.navigate(['/404']);  
					console.log(3);                             // Si le pays n'est pas valide, redirige vers la page 404
				}
			  });
			}
		  },
		  error: (error) => {                                                   // Fonction appelée en cas d'erreur lors de la récupération des données.
			console.error('Error loading data:', error);                        // Affiche l'erreur dans la console.
			this.isLoading = false;                                             // Désactive le drapeau de chargement en cas d'erreur.
			this.errorMessage = 'Error loading Olympics data';                 // Définit un message d'erreur à afficher dans l'interface utilisateur.
		  }
		})
		;
	}

	@HostListener('window:resize')
	onResize() {
	  this.updateChartSize();
	}
	  
	ngOnDestroy(): void {                                         // Méthode pour nettoyer les ressources, notamment en désabonnant des observables.
		this.subscriptions.unsubscribe();                         // Appelle la méthode 'unsubscribe' sur l'objet 'subscriptions' pour annuler tous les abonnements actifs.
	}
	
	private updateChartSize() {
		const maxWidth = 700;                                             // Définit la largeur maximale du graphique à 700 pixels.
		const widthRatio = 0.9;                                           // Définit un ratio de 90% de la largeur de la fenêtre du navigateur pour le graphique.
		const aspectRatio = 0.5;                                          // Définit un ratio hauteur/largeur de 0.5 (ce qui signifie que la hauteur sera la moitié de la largeur).
		const width = Math.min(window.innerWidth * widthRatio, maxWidth); // Calcule la largeur du graphique comme étant le plus petit entre 90% de la largeur de la fenêtre et 700 pixels.
		const height = width * aspectRatio;                               // Calcule la hauteur du graphique en utilisant le ratio hauteur/largeur défini précédemment.
		this.chartView = [width, height];                                 // Met à jour la propriété chartView avec les nouvelles dimensions du graphique.
	}

private isValidCountry(countryName: string): boolean {          //
  return this.allCountryNames.includes(countryName);            // Vérifie si le 'countryName' donné est présent dans la liste 'allCountryNames'.
}

	navigateBackHome(): void {                                  // Méthode d'un bouton pour naviguer vers la page d'accueil
		this.router.navigate(["/"]);                            // J'utilise le service router pour naviguer vers la racine ("/")
	}

	ngAfterViewInit(): void {
		this.olympicService.loadInitialData().subscribe({
			next: () => {
				this.loadCountryData(); // Charger les données du pays si les données initiales sont chargées avec succès
			},
			error: (error) => {
				console.error('Error loading initial data:', error); // Afficher l'erreur dans la console
				this.isLoading = false; // Désactiver l'indicateur de chargement
				this.errorMessage = 'Failed to load initial data'; // Mettre à jour le message d'erreur pour affichage dans l'interface utilisateur
				// Vous pouvez également rediriger vers une autre page ou effectuer d'autres actions en cas d'erreur
			}
		});
	}
	

	private loadCountryData(): void {
		this.isLoading = true;                                                           // Indique le début du processus de chargement.
	
		this.subscriptions.add(
		this.olympicService.getCountryData(this.countryName)                             // Appelle la méthode getCountryData du service OlympicService en passant le nom du pays sélectionné.
		  .subscribe({                                                                   // Souscrit à l'Observable retourné par getCountryData.
			next: (data: OlympicCountry | null) => {                                     // La fonction 'next' est exécutée avec les données reçues.
			  if (data && data.participations && data.participations.length > 0) {       // Vérifie si les données du pays et ses participations sont disponibles et non vides.
				this.countryData = data;                                                 // Met à jour la propriété countryData avec les données reçues.
				this.numberOfEntries = data.participations.length;                       // Met à jour le nombre total de participations.
				this.totalNumberMedals = data.participations.reduce((total, participation) => total + participation.medalsCount, 0);      // Calcule le nombre total de médailles.
				this.totalNumberOfAthletes = data.participations.reduce((total, participation) => total + participation.athleteCount, 0); // Calcule le nombre total d'athlètes.
				this.calculateChartData();                                               // Appelle la méthode calculateChartData pour préparer les données du graphique.
			  } else {                                                                   // Si aucune donnée ou participation n'est trouvée pour le pays.
				this.errorMessage = 'No data or participations found for ' + this.countryName; // Met à jour le message d'erreur.
			  }
			  this.isLoading = false;                                                    // Indique la fin du processus de chargement.
			},
			error: (error) => {                                                          // Fonction appelée en cas d'erreur lors du chargement des données.
			  this.isLoading = false;                                                    // Désactive l'indicateur de chargement.
			  console.error('Error loading country data:', error);                       // Affiche l'erreur dans la console.
			  this.errorMessage = 'Error loading country data.';                         // Met à jour le message d'erreur avec les détails de l'erreur.
			}
		  })
		);
	}
	
	private calculateChartData(): void {
		if (this.countryData && this.countryData.participations) {             // Vérifie si les données du pays et ses participations sont disponibles.
			const medalsByYear: { [year: string]: number } = {};               // Initialise un objet pour stocker le nombre de médailles par année.
	
			this.countryData.participations.forEach((participation: Participation) => { // Parcourt chaque participation pour les données du pays.
				const year = participation.year.toString();                    // Convertit l'année en chaîne de caractères.
				const medalsCount = participation.medalsCount;                 // Obtient le nombre de médailles pour cette participation.
	
				if (!medalsByYear[year]) {                                     // Vérifie si l'année n'est pas déjà dans l'objet medalsByYear.
					medalsByYear[year] = medalsCount;                          // Si ce n'est pas le cas, ajoute l'année avec le nombre de médailles.
				} else {                                                       // Si l'année est déjà présente,
					medalsByYear[year] += medalsCount;                         // ajoute le nombre de médailles à l'année existante.
				}
			});
	
			let series = Object.keys(medalsByYear).map((year) => {             // Transforme medalsByYear en un tableau de séries pour ngx-charts.
				return { name: year, value: medalsByYear[year] };              // Crée un objet pour chaque année avec son nom et le nombre de médailles.
			});
	
			this.chartData = [{ name: "Médailles", series: series }];          // Met à jour chartData avec les données formatées pour ngx-charts.
			this.xAxisLabels = series.map((dataPoint) => dataPoint.name);      // Met à jour xAxisLabels avec les noms (années) des points de données.
		} else {
			this.chartData = [];                                               // Si aucune donnée n'est disponible, initialise chartData à un tableau vide.
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


/*
 * ngOnInit, plusieurs opérations clés sont effectuées. 
   Elle commence par initialiser l'état de chargement, gère la taille du graphique en fonction de la taille de la fenêtre, et utilise le service OlympicService pour récupérer les données des pays olympiques. 
   Ensuite, elle s'abonne aux changements de paramètres de route pour déterminer le pays spécifique à afficher. 
   Enfin, elle gère les erreurs qui pourraient survenir lors du chargement des données.




*/