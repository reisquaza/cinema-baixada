import { City, CityDTO } from "@/interfaces/City";
import { CityService } from "@/service/CityService";
import { CityMongodbRepository } from "@/repositories/mongodb/CityMongodbRepository";

export class CityServiceFactory {
    public static async build() {
        const db = await CityMongodbRepository.db();
        const mongodbService = new CityMongodbRepository(db);
        return new CityService(mongodbService);
    }

    public static async create(cityModel: CityDTO): Promise<City> {
        const cityService = await this.build();
        return await cityService.create(cityModel);
    }
}
