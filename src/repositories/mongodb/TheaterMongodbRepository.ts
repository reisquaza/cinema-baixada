import {
    RepositoryCreateResult,
    TheaterRepository,
} from "@/interfaces/Repository";
import { MongodbRepository } from "./MongodbRepository";
import { Db, WithId } from "mongodb";
import { Theater, TheaterDTO, TheaterMovie } from "@/interfaces/Theater";
import { Movie } from "@/interfaces/Movie";
import { TheaterMongodb } from "@/interfaces/mongodb/TheaterMongodb";

export class TheaterMongodbRepository
    extends MongodbRepository
    implements TheaterRepository
{
    constructor(db: Db) {
        super(db, "theater");
    }

    private mapTheater(theater: WithId<TheaterMongodb>): Theater {
        const movies: TheaterMovie[] = theater.movies.map((movie) => {
            return {
                id: this.objectIdToString(movie._id),
                name: movie.name,
            };
        });

        return {
            id: this.objectIdToString(theater._id),
            city: theater.city,
            movies: movies,
            name: theater.name,
            originId: theater.originId,
            url: theater.url,
        };
    }

    private mapTheaterMongodb(theater: TheaterDTO): TheaterMongodb {
        const movies: WithId<Omit<TheaterMovie, "id">>[] = theater.movies.map(
            (movie) => {
                return {
                    _id: this.stringToObjectId(movie.id),
                    name: movie.name,
                };
            }
        );

        return {
            city: theater.city,
            movies: movies,
            name: theater.name,
            originId: theater.originId,
            url: theater.url,
        };
    }

    public async create<T>(theaterDTO: T): Promise<RepositoryCreateResult> {
        const { insertedId } = await this.collection.insertOne(
            this.mapTheaterMongodb(theaterDTO as TheaterDTO)
        );
        return { id: insertedId.toHexString() };
    }

    public async getById<T = Theater>(id: string): Promise<T | null> {
        const theater = await this.collection.findOne<WithId<TheaterMongodb>>({
            _id: this.stringToObjectId(id),
        });
        if (!theater) {
            return null;
        }
        return this.mapTheater(theater) as T;
    }

    async saveMovie(theaterId: string, movie: Movie): Promise<void> {
        await this.collection.updateOne(
            { _id: this.stringToObjectId(theaterId) },
            {
                $addToSet: {
                    theaters: {
                        _id: this.stringToObjectId(movie.id),
                        name: movie.name,
                    },
                },
            }
        );
    }

    public async get(): Promise<Theater[]> {
        const theaters = await this.collection.find().toArray();
        return theaters.map((theater) =>
            this.mapTheater(theater as WithId<TheaterMongodb>)
        );
    }
}
