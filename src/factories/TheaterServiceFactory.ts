import { TheaterDTO } from "@/interfaces/Theater";
import { CityService } from "@/service/CityService";
import { CityMongodbRepository } from "@/repositories/mongodb/CityMongodbRepository";
import { MongodbRepository } from "@/repositories/mongodb/MongodbRepository";
import { TheaterService } from "@/service/TheaterService";

export class TheaterServiceFactory {
    public static async create(theater: TheaterDTO) {
        const db = await MongodbRepository.db();
        const repository = new MongodbRepository(db, "theater");
        const cityRepository = new CityMongodbRepository(db);
        const cityService = new CityService(cityRepository);
        return new TheaterService(repository, cityService).create(theater);
    }
}
