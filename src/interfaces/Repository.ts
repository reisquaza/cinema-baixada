export interface Repository {
    create<T>(createDTO: Omit<T, "id">): Promise<RepositoryResponse>;
    // getById<T>(id: string): Promise<T>;
    // get<T>(): Promise<T>;
    // update<T>(updateDTO: Partial<T>): Promise<T>;
}

export interface RepositoryResponse {
    id: string;
}
