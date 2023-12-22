import { NgModule } from '@angular/core';                    // NgModules sont des conteneurs pour un groupe cohérent de classes avec des fonctionnalités connexes. Ils sont utilisés pour organiser et structurer les applications Angular.
import { RouterModule, Routes } from '@angular/router';      // Le RouterModule est utilisé pour configurer les routes de l'application, et l'interface Routes est utilisée pour définir les routes elles-mêmes.
import { HomeComponent } from './pages/home/home.component'; // C'est le composant qui sera chargé lorsque l'utilisateur navigue vers le chemin d'accès de la page d'accueil.
import { NotFoundComponent } from './pages/not-found/not-found.component'; // Ce composant sera utilisé pour afficher une page "404 Not Found" lorsque l'URL ne correspond à aucune route définie.

const routes: Routes = [                                     // Déclare une constante routes de type Routes (un tableau de routes).
  {
    path: '',                                                // Définit une route. Quand le chemin d'accès (path) est vide ('')
    component: HomeComponent,                                // le HomeComponent est chargé. Cela correspond généralement à la page d'accueil.
  },
  {
    path: '**',                                              // wildcard est utilisé (**) pour définir une route. Cette route correspond à tout chemin non défini ailleurs dans la configuration. 
    component: NotFoundComponent,                            // Elle charge NotFoundComponent, utile pour afficher une page d'erreur lorsque l'URL demandée n'existe pas. 404
  },
];

@NgModule({                                                  // Décorateur @NgModule qui marque la classe comme un module Angular.
  imports: [RouterModule.forRoot(routes)],                   // Ajoute RouterModule au tableau des imports du module, avec la configuration de route (routes) initialisée via forRoot. forRoot configure le routeur au niveau racine de l'application.
  exports: [RouterModule],                                   // Exporte RouterModule pour qu'il soit disponible dans d'autres parties de l'application.
})
export class AppRoutingModule {}                             // Déclare et exporte la classe AppRoutingModule, qui est le module de routage de l'application.



// Chaque ligne contribue à la mise en place et à la configuration du système de routage dans une application Angular, permettant ainsi une navigation fluide entre différents composants ou vues.