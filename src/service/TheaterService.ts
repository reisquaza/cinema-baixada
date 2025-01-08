import { Repository } from "@/interfaces/Repository";
import { Theater, TheaterDTO } from "@/interfaces/Theater";

export class TheaterService {
    private readonly repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    public async create(theater: TheaterDTO): Promise<Theater> {
        const { id } = await this.repository.create(theater);
        return {
            id,
            city: theater.city,
            movies: theater.movies,
            name: theater.name,
            url: theater.url,
        };
    }
}
