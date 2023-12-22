import { NgModule } from '@angular/core';                       // Necessaire pour définir un module Angular.
import { CommonModule } from '@angular/common';                 //  Il fournit des fonctionnalités Angular de base comme les directives communes (NgIf, NgFor, etc.).
import { HeaderComponent } from './header/header.component';    // J'importe le composant HeaderComponent 
import { FooterComponent } from './footer/footer.component';    // J'importe le composant FooterComponent
import { RouterModule } from '@angular/router';


@NgModule({                                                     // Décore une classe avec la fonctionnalité NgModule, indiquant qu'il s'agit d'un module Angular.
  declarations: [                                               //  Liste les composants, directives et pipes appartenant à ce module.
    HeaderComponent,                                            // Ici, il déclare que HeaderComponent fait partie de SharedModule.
    FooterComponent                                             // Il déclare que FooterComponent fait partie de SharedModule.
  ],
  exports: [                                                    // Permet à d'autres modules d'utiliser les composants, directives et pipes listés. 
    HeaderComponent,
    FooterComponent
  ],
  imports: [                                                    // Liste les modules dont ce module a besoin.
    CommonModule,                                                // CommonModule est importé, ce qui est courant pour les modules de fonctionnalités dans Angular.
    RouterModule
  ]
})
export class SharedModule { }

/*
Définit la classe SharedModule. Comme c'est un module, elle n'a pas de logique propre à une classe (comme dans un composant). 
Son rôle est de regrouper et d'organiser les composants et autres éléments Angular déclarés.n
En Résumé :
Ce fichier définit un module Angular (SharedModule) qui regroupe des composants (HeaderComponent et FooterComponent). 
Ce module permet de réutiliser ces composants dans d'autres parties de l'application en les important. 
Il utilise également des fonctionnalités de base d'Angular grâce à l'importation de CommonModule.
*/