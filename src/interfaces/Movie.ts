export interface MovieDTO {
    name: string;
    genre: string;
    imageUrl: string;
    duration: number;
    ageIndication: AgeIndication;
    sessions: MovieSession[];
    slug: string;
    originId: string | null;
    theater: MovieTheater;
}

export interface Movie extends MovieDTO {
    id: string;
}
export interface MovieTheater {
    id: string;
    originId: string | null;
    name: string;
}
export interface MovieSession {
    room: number;
    date: Date;
}

export type AgeIndication = "L" | "10" | "12" | "16" | "18";
