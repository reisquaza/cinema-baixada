import { Repository, RepositoryResponse } from "@/interfaces/Repository";
import { Collection, Db, MongoClient } from "mongodb";

export class MongodbService implements Repository {
    private readonly collection: Collection;

    constructor(database: Db, collection: string) {
        this.collection = database.collection(collection);
    }

    public static async db() {
        const client = new MongoClient(process.env.MONGODB_URL!);
        await client.connect();
        return client.db(process.env.MONGODB_DATABASE);
    }

    public async create<T>(
        createDTO: Omit<T, "id">
    ): Promise<RepositoryResponse> {
        const { insertedId } = await this.collection.insertOne(createDTO);
        return { id: insertedId.toHexString() };
    }

    // get<T>(): Promise<T> {

    // }

    // getById<T>(id: string): Promise<T> {

    // }

    // update<T>(updateDTO: Partial<T>): Promise<T> {

    // }
}
