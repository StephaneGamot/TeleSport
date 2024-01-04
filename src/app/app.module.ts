import { HttpClientModule } from "@angular/common/http";                   // Importe HttpClientModule, permettant de réaliser des requêtes HTTP dans l'application.
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';          // NgModule est un décorateur qui définit un module Angular.                             
import { BrowserModule } from "@angular/platform-browser";                 // Importe BrowserModule, nécessaire pour exécuter l'application dans un navigateur.
import { AppRoutingModule } from "./app-routing.module";                   // Importe votre module de routage AppRoutingModule pour gérer la navigation dans l'application.
import { AppComponent } from "./app.component";                            // Importe AppComponent, le composant racine de votre application.
import { HomeComponent } from "./pages/home/home.component";               // Importe HomeComponent, le composant pour la page d'accueil.
import { NotFoundComponent } from "./pages/not-found/not-found.component"; // Importe NotFoundComponent, le composant pour la page d'erreur 404.
import { DetailsComponent } from "./pages/details/details.component";      // Importe DetailsComponent, le composant pour la page de détails.
import { NgxChartsModule } from '@swimlane/ngx-charts';                    // Importe NgxChartsModule de @swimlane/ngx-charts pour l'utilisation de graphiques.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';// Importe BrowserAnimationsModule pour activer les animations dans l'application.
import { LoaderComponent } from './loader/loader.component';
import { DataErrorComponent } from './pages/data-error/data-error.component';               // Importe LoaderComponent, un composant pour afficher un indicateur de chargement.

@NgModule({                                                                // Le décorateur NgModule définit les détails et la configuration du module.
	declarations: [                                                        // 'declarations' contient la liste des composants, directives et pipes appartenant à ce module.
		AppComponent, HomeComponent, NotFoundComponent, DetailsComponent, LoaderComponent, DataErrorComponent
	],
	imports: [                                                             // 'imports' contient la liste des modules dont les fonctionnalités sont requises par ce module.
		BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule
	],
	providers: [],                                                         // 'providers' est utilisé pour inscrire des services au niveau du module.
	bootstrap: [AppComponent],                                             // 'bootstrap' indique le composant racine à charger lors du démarrage de l'application.
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}                                                  // Définition de la classe AppModule, le module racine de l'application Angular.

/*

le module Angular AppModule inclut la gestion des composants, le routage, les requêtes HTTP, l'utilisation de graphiques, et les animations. 
Le module AppModule sert de fondation pour structurer et organiser une application Angular.

*/