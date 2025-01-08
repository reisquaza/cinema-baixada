export interface CinemarkResponse<CinemarkResult> {
    success: boolean;
    messageError: null;
    dataResult: CinemarkResult[];
    pageNumber: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface CinemarkSessionResult {
    date: Date;
    theaterId: string;
    theatherName: string;
    rooms: CinemarkSessionRoom[];
}

export interface CinemarkSessionRoom {
    number: number;
    features: number[];
    audio: number;
    sessions: CinemarkSession[];
}

export interface CinemarkSession {
    id: string;
    date: Date;
    hybrid: boolean;
    expired: boolean;
    moviePrintCode: number;
}

export interface CinemarkMovieResult {
    id: string;
    slug: string;
    name: string;
    assets: CinemarkAssets[];
    tag: CinemarkTag;
    duration: number;
    ageIndicator: AgeIndicator;
    isFavorite: boolean;
    genre: string;
    displaySessionType: number;
    snackbarCategoryId: number;
    snackbarCategoryPrimeId: number;
}
type AgeIndicator = "L" | "10";

export interface CinemarkTag {
    icon: string;
    description: string;
}

export interface CinemarkAssets {
    url: string;
    type: number;
}
