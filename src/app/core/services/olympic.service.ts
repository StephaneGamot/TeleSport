import { HttpClient } from '@angular/common/http';         // Import d'une dépendance pour les requêtes HTTP
import { Injectable } from '@angular/core';                // Injectable marque une classe comme un service qui peut être injecté.
import { BehaviorSubject } from 'rxjs';                    // BehaviorSubject est un type d'Observable qui garde en mémoire la dernière valeur émise.
import { catchError, tap } from 'rxjs/operators';          // Importe catchError et tap, des opérateurs pour manipuler les Observables.
import { OlympicCountry } from '../models/Olympic';        // Importe le modèle OlympicCountry pour le typage.
import { throwError } from 'rxjs';                         // Importe throwError pour créer un Observable qui émet une erreur.
import { map } from 'rxjs/operators';                      // Importe map, un opérateur pour transformer les données émises par un Observable.

@Injectable({                                              // Décorateur Injectable, indique que ce service peut être injecté dans d'autres classes.
  providedIn: 'root',                                      // providedIn: 'root' signifie que le service est disponible globalement.
})

export class OlympicService {                              // Déclare la classe OlympicService.
  private olympicUrl = './assets/mock/olympic.json';       // Point de départ des données - URL du fichier JSON contenant les données olympiques.
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>(null); // BehaviorSubject pour stocker et émettre les données olympiques.

  constructor(private http: HttpClient) {}                 // Constructeur avec une injection de HttpClient.

  loadInitialData() {
    // return throwError(() => new Error('Simulated error loading data'));  //Pour tester lors de la soutenance
   return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe( // Requête HTTP GET pour récupérer les données olympiques.
      tap((value) => this.olympics$.next(value)),                // Utilise tap pour réagir aux nouvelles données et les passer à olympics$.
      catchError((error) => {                                    // catchError pour gérer les erreurs lors de la requête.
        console.error('Error loading Olympic data:', error)      // Affiche l'erreur dans la console.
        return throwError(() => error);                          // Renvoie l'erreur sous forme d'Observable.
      })
    );
  }

  getOlympics() {                                                         // Méthode pour obtenir les données olympiques.
    return this.olympics$.asObservable();                                 // Retourne olympics$ comme Observable pour être observé par les composants.
  }
  
  getCountryData(countryName: string) {                                   // Méthode pour obtenir les données d'un pays spécifique.
    return this.olympics$.pipe(                                           // Utilise pipe pour traiter les données de olympics$.
      map((countries) => {                                                // map pour transformer les données émises.
        if (!countries) {                                                 // Vérifie si la liste des pays est vide.
          return null;                                                    // Retourne null si aucun pays n'est trouvé.
        }
        const country = countries.find((c) => c.country === countryName); // Trouve le pays correspondant au nom donné.
        return country || null;                                           // Retourne les données du pays ou null si non trouvé.
      })
    );
  }
}
/*
* Un Observable est un flux de données asynchrones ou des événements dans le temps, auquel les composants peuvent s'abonner pour réagir aux données émises.

* RxJS est une bibliothèque qui fournit des outils pour créer et manipuler des Observables, rendant la gestion des opérations asynchrones et des événements dans Angular plus efficace et plus gérable.
   Opérateurs : RxJS fournit une multitude d'opérateurs (comme map, filter, tap, catchError) qui vous permettent de manipuler, de transformer, et de gérer les Observables de manière puissante et flexible.
   Gestion des Erreurs : RxJS offre des moyens élégants de gérer les erreurs dans les flux de données asynchrones.
   Combiner des Flux de Données : Avec RxJS, vous pouvez combiner plusieurs Observables de différentes manières, synchronisant ainsi plusieurs flux de données asynchrones.

   * this.http.get<any>(this.olympicUrl).pipe(tap((value) => this.olympics$.next(value))
     Va chercher des données à l' adresse 'olympicUrl', et à chaque fois que tu reçois des données, utilise-les pour faire quelque chose d'autre sans les changer, et envoie ces données à tous ceux qui en ont besoin dans notre application
*/