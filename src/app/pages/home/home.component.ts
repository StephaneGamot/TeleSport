import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";           // Importe les décorateurs Component et OnInit d'Angular.
import { Subscription } from "rxjs";                   
import { Observable } from "rxjs";                                      // Importe Observable de RxJS pour la programmation réactive.
import { OlympicService } from "src/app/core/services/olympic.service"; // Importe OlympicService pour accéder aux données et méthodes liées aux Jeux Olympiques.
import { OlympicCountry } from "src/app/core/models/Olympic";           // Importe le modèle OlympicCountry pour structurer les données olympiques.
import { map, finalize } from "rxjs/operators";                         // Importe map et finalize de RxJS pour transformer et finaliser les Observables.
import { Router } from "@angular/router";                               // Importe Router pour la navigation entre les routes.
import { ChartData } from "src/app/core/models/chart-data.interface";   // Importe l'interface ChartData pour structurer les données des graphiques.

@Component({                                                            // Décorateur Component qui définit les métadonnées du composant HomeComponent.
	selector: "app-home",                                               // Sélecteur CSS du composant.
	templateUrl: "./home.component.html",                               // Chemin vers le template HTML du composant.
	styleUrls: ["./home.component.scss"],                               // Chemins vers les fichiers de style SCSS du composant.
})

export class HomeComponent implements OnInit, OnDestroy {                     // Déclare la classe HomeComponent et implémente OnInit pour le hook de cycle de vie.
	private subscriptions = new Subscription();
	public olympics$: Observable<OlympicCountry[]> | undefined;         // Observable pour stocker les données des pays olympiques.
	public chartData: ChartData[] = [];                                 // Tableau pour stocker les données formatées pour le graphique.
	public numberOfJOs: number = 0;                                     // Variable pour stocker le nombre total de Jeux Olympiques.
	public numberOfCountries: number = 0;                               // Variable pour stocker le nombre total de pays participants.
	public isLoading: boolean = false;                                  // Drapeau pour indiquer l'état de chargement.
	public errorMessage: string | null = null;                          // Variable pour stocker les messages d'erreur.
	public chartView: [number, number] = [700, 400];                    // Dimensions du graphique.

	constructor(private olympicService: OlympicService, private router: Router) {} // Constructeur pour injecter OlympicService et Router.

	ngOnInit(): void {                                                  // Méthode ngOnInit pour initialiser le composant.
		this.isLoading = true;                                          // Active l'indicateur de chargement.
		this.updateChartSize();                                         // Appelle la méthode pour ajuster la taille du graphique.

		this.subscriptions.add(
		this.olympicService                                             // Utilise OlympicService pour charger les données initiales.
			.loadInitialData()                                          // Appelle la méthode pour charger les données.
			.pipe(                                                      // Utilise les opérateurs RxJS pour transformer et finaliser les données.
				map((countries: OlympicCountry[]) => countries),        // Utilise map pour transformer les données reçues.
				finalize(() => (this.isLoading = false))                // Utilise finalize pour désactiver l'indicateur de chargement une fois le traitement terminé.
			)
			.subscribe({                                                // Souscrit à l'Observable pour recevoir les données.
				next: (countries) => {                                  // Fonction next pour traiter les données reçues.
					if (countries) {                                    // Vérifie si les données des pays sont présentes.
						this.numberOfJOs = this.calculateNumberOfJOs(countries);  // Calcule le nombre de Jeux Olympiques.
						this.numberOfCountries = countries.length;                // Calcule le nombre de pays participants.
						this.chartData = countries.map((country) => ({            // Transforme les données des pays pour le graphique.
							name: country.country,                                // Nom du pays pour l'étiquette.
							value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0), // Calcule le nombre total de médailles pour chaque pays.
						}));                             
					}
				},
				error: (error) => {                                     // Fonction error pour gérer les erreurs de chargement des données.
					console.error("Error loading data:", error);        // Affiche l'erreur dans la console.
					this.isLoading = false;                             // Désactive l'indicateur de chargement en cas d'erreur.
					this.errorMessage = "Failed to load data Home Page"; // Met à jour le message d'erreur.
				},
				
			})
		);
		
	}

	ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

	@HostListener('window:resize')
    onResize() {
        this.updateChartSize();
    }

	private updateChartSize() {                                         //
		const maxWidth = 700;                                           // Définit la largeur maximale du graphique à 700 pixels.
		const widthRatio = 0.9;                                         // 90% de la largeur de la fenêtre
		const aspectRatio = 0.5;                                        // Ratio hauteur / largeur (par exemple, 0.5 pour un ratio de 2:1)
		const width = Math.min(window.innerWidth * widthRatio, maxWidth); // Calcule la largeur du graphique comme étant le plus petit entre 90% de la largeur de la fenêtre et 700 pixels.
		const height = width * aspectRatio;                             // Calcule la hauteur du graphique en utilisant le ratio hauteur/largeur défini précédemment.
		this.chartView = [width, height];                               // Met à jour la propriété chartView avec les nouvelles dimensions du graphique.
	}

	private calculateNumberOfJOs(countries: OlympicCountry[]): number { // Cette méthode calcule le nombre total d'années distinctes des Jeux Olympiques à partir des données des pays.
		const yearsOfJOs: number[] = [];                                // Initialise un tableau vide pour stocker les années distinctes des Jeux Olympiques.
	
		countries.forEach((olympic) => {                                // Parcourt chaque pays dans la liste des pays olympiques.
			olympic.participations.forEach((participation) => {         // Parcourt chaque participation olympique du pays.
				if (!yearsOfJOs.includes(participation.year)) {         // Vérifie si l'année de la participation n'est pas déjà dans le tableau 'yearsOfJOs'.
					yearsOfJOs.push(participation.year);                // Si l'année n'est pas présente, l'ajoute au tableau.
				}
			});
		});
	
		return yearsOfJOs.length;                                       // Retourne la longueur du tableau 'yearsOfJOs', qui représente le nombre total d'années distinctes des Jeux Olympiques.
	}	

	onChartClick(event: ChartData): void {                              // Gère les clics sur le graphique.
		if (event && event.name) {                                      // Vérifie si l'événement et le nom de l'événement sont présents.
			this.router.navigate([`/details/${event.name}`]);           // Navigue vers la page de détails du pays sélectionné.
		}
	}

	tooltipText = (item: ChartData): string => {                        // Fonction pour générer le texte de l'infobulle sur le graphique.
		const label = item.name;                                        // Récupère le nom du pays (label).
		const val = item.value;                                         // Récupère la valeur (nombre de médailles).
		return `${label} ${val}`;                                       // Formate et retourne le texte de l'infobulle.
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
