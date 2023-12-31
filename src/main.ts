import { enableProdMode } from '@angular/core';                            // Importe 'enableProdMode' pour activer le mode production d'Angular.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';// Importe 'platformBrowserDynamic' pour démarrer l'application dans un navigateur avec un compilateur Just-in-Time (JIT).
import { AppModule } from './app/app.module';                              // Importe 'AppModule', le module racine de votre application Angular.
import { environment } from './environments/environment';                  // Importe 'environment' pour accéder aux variables d'environnement spécifiques.

if (environment.production) {                                              // Vérifie si l'application est en mode production.
  enableProdMode();                                                        // Active le mode production, qui désactive les assertions Angular et autres vérifications pour améliorer les performances.
}

platformBrowserDynamic().bootstrapModule(AppModule)                        // Initialise et démarre l'application en utilisant 'AppModule'.
  .catch(err => console.error(err));                                       // Attrape et affiche les erreurs survenant pendant l'initialisation.

  /*
  
  Ce fichier joue un rôle crucial dans la configuration du mode de déploiement (développement ou production) et dans le lancement de l'application via le module racine AppModule.
  Le mode production est activé si la variable d'environnement correspondante est définie, améliorant ainsi les performances en désactivant certaines fonctionnalités de développement.
  
  */