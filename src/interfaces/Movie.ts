export interface MovieDTO {
    name: string;
    genre: string;
    imageUrl: string;
    duration: number;
    ageIndication: AgeIndication;
    sessions: MovieSession[];
    slug: string;
    theaterId: string;
}

export interface Movie extends MovieDTO {
    id: string;
}

export interface MovieSession {
    room: number;
    date: Date;
}

export type AgeIndication = "L" | "10" | "12" | "16" | "18";
