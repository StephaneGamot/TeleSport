import { TestBed } from '@angular/core/testing';      // Importation des outils de test d'Angular.

import { OlympicService } from './olympic.service';   // Importation du service qui est testé.

describe('OlympicService', () => {                    // Le bloc 'describe' est utilisé pour regrouper un ensemble de tests similaires pour 'OlympicService'.
  let service: OlympicService;                        // Déclaration d'une variable pour référencer votre service.

  beforeEach(() => {                                  // Le bloc 'beforeEach' est exécuté avant chaque test. Il est utilisé pour initialiser l'environnement de test.
    TestBed.configureTestingModule({});               // Configuration du module de test. 'TestBed' est une API Angular pour configurer et initialiser l'environnement pour les tests unitaires.
    service = TestBed.inject(OlympicService);         // Création d'une instance de 'OlympicService' en utilisant 'TestBed'.
                                                      // 'TestBed.inject' est utilisé pour obtenir une instance du service à partir de l'environnement de test.
  });
                                                      
                                                      // Un test unitaire individuel
  it('should be created', () => {                     // 'it' est utilisé pour définir un test spécifique. Ici, vous testez si le service est correctement créé.        
    expect(service).toBeTruthy();                     // 'expect' est une assertion. Ici, vous vous attendez à ce que le service soit "truthy", ce qui signifie qu'il doit exister ou être défini.
  });
});
