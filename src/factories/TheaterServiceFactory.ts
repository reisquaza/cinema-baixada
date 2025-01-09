import { TheaterDTO } from "@/interfaces/Theater";
import { CityMongodbRepository } from "@/repositories/mongodb/CityMongodbRepository";
import { MongodbRepository } from "@/repositories/mongodb/MongodbRepository";
import { TheaterService } from "@/service/TheaterService";
import { CityServiceFactory } from "./CityServiceFactory";

export class TheaterServiceFactory {
    public static async build() {
        const db = await CityMongodbRepository.db();
        const repository = new MongodbRepository(db, "theater");
        const cityService = await CityServiceFactory.build();
        return new TheaterService(repository, cityService);
    }

    public static async create(theater: TheaterDTO) {
        const theaterService = await this.build();
        return await theaterService.create(theater);
    }
}
