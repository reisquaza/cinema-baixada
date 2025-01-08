import { Theater } from "@/interfaces/Theater";
import { MongodbService } from "@/service/MongodbService";
import { TheaterService } from "@/service/TheaterService";

export class TheaterServiceFactory {
    public static async create(theater: Omit<Theater, "id">) {
        const db = await MongodbService.db();
        const mongodbService = new MongodbService(db, "theater");
        return new TheaterService(mongodbService).create(theater);
    }
}
