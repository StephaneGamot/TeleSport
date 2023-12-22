export interface Participation {
    id: number;                        // Représente un identifiant unique pour chaque participation
    year: number;                      // Représente l'année de la participation
    city: string;                      // Ici une chaîne de caractères m'indiquant la ville où la participation a eu lieu
    medalsCount: number;               // Représente le nombre total de médailles remportées
    athleteCount: number;              // Représente le nombre total d'athlètes participant
}
