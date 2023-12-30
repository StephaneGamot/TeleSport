import { HttpClient } from '@angular/common/http';         // Import d'une dépendance pour les requêtes HTTP
import { Injectable } from '@angular/core';                //              Injectable pour définir le service,
import { BehaviorSubject } from 'rxjs';                    // Pour la gestion réactive des données.
import { catchError, tap } from 'rxjs/operators';          //
import { OlympicCountry } from '../models/Olympic';        //
import { throwError } from 'rxjs';                         //
import { map } from 'rxjs/operators';                      //


@Injectable({                                              // C'est un décorateur qui marque une classe comme disponible pour être fournie et injectée comme dépendance.
  providedIn: 'root',                                      // Cela indique qu'Angular doit créer une instance unique de cette classe de service et la fournir dans l'injecteur racine. Il est disponible dans toute l'application.
})

export class OlympicService {                              //
  private olympicUrl = './assets/mock/olympic.json';       // Point de départ des données
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>(null); // Ceci est un BehaviorSubject qui stockera et diffusera les données des pays olympiques. 

  constructor(private http: HttpClient) {}                 // private rend http accessible uniquement dans cette classe. HttpClient est utilisé pour faire des requêtes HTTP

  loadInitialData() {
    // return throwError(() => new Error('Simulated error loading data'));  //Pour tester lors de la soutenance
   return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe( //
      tap((value) => this.olympics$.next(value)),                //
      catchError((error) => {                                    //
        console.error('Error loading Olympic data:', error)      //
        return throwError(() => error);                          //
      })
    );
  }

  getOlympics() {                                          // Cette méthode retourne un observable de olympics$, permettant aux composants de s'abonner et de réagir aux changements de données.
    return this.olympics$.asObservable();                  // Retourne olympics$ comme un observable. 
  }
  
  getCountryData(countryName: string) {                                   //
    return this.olympics$.pipe(                                           //
      map((countries) => {                                                //
        if (!countries) {                                                 //
          return null;                                                    //
        }
        const country = countries.find((c) => c.country === countryName); //
        return country || null;                                           //
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