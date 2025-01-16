import { Repository, RepositoryCreateResult } from "@/interfaces/Repository";
import { Collection, Db, Document, MongoClient, ObjectId } from "mongodb";

export class MongodbRepository implements Repository {
    protected readonly collection: Collection;

    constructor(database: Db, collection: string) {
        this.collection = database.collection(collection);
    }

    public static async db() {
        const client = new MongoClient(process.env.MONGODB_URL!);
        await client.connect();
        return client.db(process.env.MONGODB_DATABASE);
    }

    protected stringToObjectId(id: string) {
        return new ObjectId(id);
    }

    protected objectIdToString(objectId: ObjectId) {
        return objectId.toHexString();
    }

    public async create<T>(createDTO: T): Promise<RepositoryCreateResult> {
        const { insertedId } = await this.collection.insertOne(
            createDTO as Document
        );
        return { id: insertedId.toHexString() };
    }

    public async getBy<T>(filter: Partial<T>): Promise<T[]> {
        const find = await this.collection.find(filter).toArray();
        return find.map((doc) => {
            const { _id, ...rest } = doc;
            const result = { ...rest, id: _id.toString() };
            return result as T;
        });
    }

    public async getById<T>(id: string): Promise<T | null> {
        const find = await this.collection.findOne({
            _id: new ObjectId(id),
        });
        if (!find) {
            return null;
        }
        const result = { ...find, id: find._id.toString() };
        return result as T;
    }

    public async getByTheaterId(theaterId: string) {
        const find = await this.collection
            .find({
                $where: `theater._id: ${this.stringToObjectId(theaterId)}`,
            })
            .toArray();
        return find;
    }
    // update<T>(updateDTO: Partial<T>): Promise<T> {

    // }
}
