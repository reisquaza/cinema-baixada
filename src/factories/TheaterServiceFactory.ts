import { Theater } from "@/interfaces/Theater";
import { MongodbService } from "@/service/MongodbService";
import { TheaterService } from "@/service/TheaterService";

export class TheaterServiceFactory {
    public static async save(theater: Omit<Theater, "id">) {
        const client = await MongodbService.client();
        const db = client.db(process.env.MONGODB_DATABASE);
        const mongodbService = new MongodbService(db, "theater");
        return new TheaterService(mongodbService).save(theater);
    }
}
