import { City, CityDTO } from "@/interfaces/City";
import { CityRepository } from "@/interfaces/Repository";
import { Theater } from "@/interfaces/Theater";

export class CityService {
    private readonly repository: CityRepository;

    constructor(repository: CityRepository) {
        this.repository = repository;
    }

    public async create(cityDTO: CityDTO): Promise<City> {
        const { id } = await this.repository.create(cityDTO);
        return { id, name: cityDTO.name, theaters: cityDTO.theaters };
    }

    public async getAll(): Promise<City[]> {
        return await this.repository.get();
    }

    public async getById(id: string): Promise<City> {
        const city = await this.repository.getById<City>(id);
        if (!city) {
            throw new Error(`City ${id} not found`);
        }
        return city;
    }

    public async saveTheater(id: string, theater: Theater): Promise<void> {
        await this.getById(id);
        await this.repository.saveTheater(id, theater);
    }
}
