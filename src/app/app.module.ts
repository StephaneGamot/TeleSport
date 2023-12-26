import { HttpClientModule } from "@angular/common/http";                   // Permet de faire des requêtes HTTP
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';                           // NgModule est un décorateur qui définit un module Angular.
import { BrowserModule } from "@angular/platform-browser";                 // Fournit des services nécessaires pour lancer l'application dans un navigateur.
import { AppRoutingModule } from "./app-routing.module";                   // Votre propre module de routage pour gérer la navigation.
import { AppComponent } from "./app.component";                            // Le composant racine de votre application.
import { HomeComponent } from "./pages/home/home.component";               // Le composant pour la page d'accueil.
import { NotFoundComponent } from "./pages/not-found/not-found.component"; // Le composant pour la page 404.
import { DetailsComponent } from "./pages/details/details.component";      // Le composant pour la page de détails.
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({ 	                                                           // Décorateur NgModule qui marque la classe comme un module Angular.
	declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent], // Déclare les composants qui appartiennent à ce module.
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule],    // Importe d'autres modules dont les fonctionnalités sont nécessaires dans ce module.
	providers: [],                                                         // Ici, vous pouvez ajouter des services qui seront disponibles dans toute l'application.
	bootstrap: [AppComponent],                                             // Définit le composant racine qui sera chargé au démarrage de l'application.
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}                                                  // La classe AppModule est le module racine
