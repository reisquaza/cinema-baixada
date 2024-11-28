export interface Movie {
    id: string;
    slug: string;
    name: string;
    genre: string;
    posterUrl: string;
    duration: number;
    ageIndicator: AgeIndicator;
}

type AgeIndicator = "L";
