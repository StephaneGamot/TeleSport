import { Participation } from "./Participation";

export interface OlympicCountry {
    id: number;                        // Représente un identifiant unique pour chaque pays olympique
    country: string;                   //  Ici une chaîne de caractères indiquant le nom du pays
    participations: Participation[];   // Ici un tableau d'objets de type Participation qui est importé .
}


/*
L'interface OlympicCountry permet de typer des objets représentant des pays en assurant que chaque pays a un identifiant, 
un nom, et une liste de participations qui respectent les types définis
*/