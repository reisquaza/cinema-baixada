import { City, CityDTO } from "@/interfaces/City";
import { Repository } from "@/interfaces/Repository";

export class CityService {
    private readonly repository: Repository;
    constructor(repository: Repository) {
        this.repository = repository;
    }

    public async create(cityDTO: CityDTO): Promise<City> {
        const { id } = await this.repository.create(cityDTO);
        return { id, name: cityDTO.name, theaters: cityDTO.theaters };
    }
}
