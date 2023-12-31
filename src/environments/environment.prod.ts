export const environment = {
  production: true                   //  Configure l'application en mode production. En mode production, Angular optimise les performances en désactivant certaines vérifications de développement et débogage.
};


/*

Mode Production : En mode production, Angular optimise l'application pour une meilleure performance en désactivant le développement supplémentaire et les vérifications de débogage. 
Par exemple, cela inclut la minimisation des fichiers, l'optimisation des liaisons et l'exécution plus rapide du change detection.

Utilisation : Cette configuration est généralement utilisée pour différencier les comportements de l'application entre les phases de développement et de production. 
Vous pouvez avoir un fichier environment.ts pour le développement (où production est faux) et un environment.prod.ts pour la production.

*/