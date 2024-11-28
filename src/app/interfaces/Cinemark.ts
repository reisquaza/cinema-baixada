export interface CinemarkMovie {
    success: boolean;
    messageError: null;
    dataResult: CinemarkDataResult[];
    pageNumber: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface CinemarkDataResult {
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
type AgeIndicator = "L";

export interface CinemarkTag {
    icon: string;
    description: string;
}

export interface CinemarkAssets {
    url: string;
    type: number;
}
