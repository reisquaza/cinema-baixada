export interface TheaterDTO {
    name: string;
    city: TheaterCity;
    url: string;
    movies: TheaterMovie[];
}

export interface Theater extends TheaterDTO {
    id: string;
}

export interface TheaterCity {
    id: string;
    name: string;
}

export interface TheaterMovie {
    id: string;
    name: string;
}
