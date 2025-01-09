import { City } from "./City";
import { Theater } from "./Theater";

export interface Repository {
    create<T>(createDTO: Omit<T, "id">): Promise<RepositoryResponse>;
    getBy<T>(filter: Partial<T>): Promise<T[]>;
    getById<T>(id: string): Promise<T | null>;
    // update<T>(updateDTO: Partial<T>): Promise<T>;
}

export interface CityRepository extends Repository {
    get(): Promise<City[]>;
    saveTheater(cityId: string, theater: Theater): Promise<void>;
}
export interface RepositoryResponse {
    id: string;
}
