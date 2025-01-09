import { Repository } from "@/interfaces/Repository";
import { Theater, TheaterDTO } from "@/interfaces/Theater";
import { CityService } from "./CityService";

export class TheaterService {
    private readonly cityService: CityService;
    private readonly repository: Repository;

    constructor(repository: Repository, cityservice: CityService) {
        this.repository = repository;
        this.cityService = cityservice;
    }

    public async create(theaterDTO: TheaterDTO): Promise<Theater> {
        const { id } = await this.repository.create(theaterDTO);
        const theater: Theater = {
            id,
            city: theaterDTO.city,
            movies: theaterDTO.movies,
            name: theaterDTO.name,
            url: theaterDTO.url,
            originId: theaterDTO.originId,
        };
        await this.cityService.saveTheater(theater.city.id, theater);
        return theater;
    }

    public async getById(id: string): Promise<Theater | null> {
        return this.repository.getById<Theater>(id);
    }
}
