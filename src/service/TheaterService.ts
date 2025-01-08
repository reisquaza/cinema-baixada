import { Repository } from "@/interfaces/Repository";
import { Theater, TheaterDTO } from "@/interfaces/Theater";

export class TheaterService {
    private readonly repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    public async create(theaterDTO: TheaterDTO): Promise<Omit<Theater, "id">> {
        const theater: Omit<Theater, "id"> = {
            city: theaterDTO.city,
            movies: [],
            name: theaterDTO.name,
            url: theaterDTO.url,
        };
        return theater;
    }

    public async save(theater: Omit<Theater, "id">): Promise<Theater> {
        const { id } = await this.repository.create(theater);
        return { id, ...theater };
    }
}
