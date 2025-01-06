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
    type: sessionType;
    time: Date;
}

export type sessionType = "dub" | "sub";

export type AgeIndicator = "L";
