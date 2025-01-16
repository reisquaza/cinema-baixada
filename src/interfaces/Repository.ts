import { City } from "./City";
import { Movie } from "./Movie";
import { Theater } from "./Theater";

export interface Repository {
    create<T>(createDTO: T): Promise<RepositoryCreateResult>;
    getBy<T>(filter: Partial<T>): Promise<T[]>;
    getById<T>(id: string): Promise<T | null>;
    // update<T>(updateDTO: Partial<T>): Promise<T>;
}

export interface CityRepository extends Repository {
    get(): Promise<City[]>;
    saveTheater(cityId: string, theater: Theater): Promise<void>;
}
export interface MovieRepository extends Repository {
    get(): Promise<Movie[]>;
    getByTheaterId(theaterId: string): Promise<Movie[]>;
}
export interface TheaterRepository extends Repository {
    get(): Promise<Theater[]>;
    saveMovie(theaterId: string, movie: Movie): Promise<void>;
}
export interface RepositoryCreateResult {
    id: string;
}
