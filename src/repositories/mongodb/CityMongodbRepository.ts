import { CityRepository } from "@/interfaces/Repository";
import { MongodbRepository } from "./MongodbRepository";
import { Db, Document, ObjectId, WithId } from "mongodb";
import { City, CityTheater } from "@/interfaces/City";
import { Theater } from "@/interfaces/Theater";

export class CityMongodbRepository
    extends MongodbRepository
    implements CityRepository
{
    constructor(db: Db) {
        super(db, "city");
    }

    private mapTheater(theater: WithId<CityTheater>): CityTheater {
        return {
            id: theater._id.toHexString(),
            name: theater.name,
        };
    }

    private mapCity(city: WithId<Document>): City {
        return {
            id: city._id.toHexString(),
            name: city.name,
            theaters: city.theaters.map((theater: WithId<CityTheater>) =>
                this.mapTheater(theater)
            ),
        };
    }

    public async get(): Promise<City[]> {
        const cities = await this.collection.find().toArray();
        return cities.map((city) => this.mapCity(city));
    }

    public async getById<T = City>(id: string): Promise<T | null> {
        const findCity = await this.collection.findOne({
            _id: new ObjectId(id),
        });
        if (!findCity) {
            return null;
        }
        return this.mapCity(findCity) as T;
    }

    public async saveTheater(
        cityId: string,
        theaterDTO: Theater
    ): Promise<void> {
        const theater: WithId<Omit<CityTheater, "id">> = {
            _id: new ObjectId(theaterDTO.id),
            name: theaterDTO.name,
        };
        await this.collection.updateOne(
            { _id: new ObjectId(cityId) },
            { $addToSet: { theaters: theater } }
        );
    }
}
