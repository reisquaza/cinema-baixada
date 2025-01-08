import { City, CityDTO } from "@/interfaces/City";
import { CityService } from "@/service/CityService";
import { MongodbService } from "@/service/MongodbService";

export class CityServiceFactory {
    public static async create(cityModel: CityDTO): Promise<City> {
        const db = await MongodbService.db();
        const mongodbService = new MongodbService(db, "city");
        return new CityService(mongodbService).create(cityModel);
    }
}
