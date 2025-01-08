export interface MovieDTO {
    name: string;
    genre: string;
    imageUrl: string;
    duration: number;
    ageIndicator: AgeIndicator;
    sessions: MovieSession[];
}

export interface Movie extends MovieDTO {
    id: string;
    slug: string;
}

export interface MovieSession {
    room: number
    date: Date;
}

export type AgeIndicator = "L" | "10" | "12" | "16" | "18";
