export interface ChartData {
    name: string;
    series?: { name: string; value: number }[];
    value?: number;
  }

  
  /*
  Propriété FACULTATIVE 'series' (indiquée par '?'). Il s'agit d'un tableau d'objets avec chaque objet ayant une structure spécifiée.
  et si il y a une propriété "series" alors chaque objet dans 'series' doit avoir un 'name' (string) et une 'value' (number).

  Ce qui signifie que l'objet ChartData peut ou ne peut pas avoir cette propriété.

  Une interface en TypeScript définit un contrat pour la structure des objets. 
  */