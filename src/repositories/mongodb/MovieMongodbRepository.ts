import { Repository, RepositoryCreateResult } from "@/interfaces/Repository";
import { MongodbRepository } from "./MongodbRepository";
import { Db, WithId } from "mongodb";
import { Movie, MovieDTO } from "@/interfaces/Movie";
import { MovieMongodb } from "@/interfaces/mongodb/MovieMongodb";

export class MovieMongodbRepository
    extends MongodbRepository
    implements Repository
{
    constructor(db: Db) {
        super(db, "movie");
    }

    private mapMovieMongodb(movieDTO: MovieDTO): MovieMongodb {
        return {
            ageIndication: movieDTO.ageIndication,
            duration: movieDTO.duration,
            genre: movieDTO.genre,
            imageUrl: movieDTO.imageUrl,
            name: movieDTO.name,
            originId: movieDTO.originId,
            sessions: movieDTO.sessions,
            slug: movieDTO.slug,
            theater: {
                _id: this.stringToObjectId(movieDTO.theater.id),
                name: movieDTO.theater.name,
                originId: movieDTO.theater.originId,
            },
        };
    }

    private mapMovie(movie: WithId<MovieMongodb>): Movie {
        return {
            id: this.objectIdToString(movie._id),
            ageIndication: movie.ageIndication,
            duration: movie.duration,
            genre: movie.genre,
            imageUrl: movie.imageUrl,
            name: movie.name,
            originId: movie.originId,
            sessions: movie.sessions,
            slug: movie.slug,
            theater: {
                id: this.objectIdToString(movie.theater._id),
                name: movie.theater.name,
                originId: movie.theater.originId,
            },
        };
    }

    public async create<T>(movieDTO: T): Promise<RepositoryCreateResult> {
        const { insertedId } = await this.collection.insertOne(
            this.mapMovieMongodb(movieDTO as MovieDTO)
        );
        return { id: insertedId.toHexString() };
    }

    async getById<T = Movie>(id: string): Promise<T | null> {
        const movie = await this.collection.findOne<WithId<MovieMongodb>>(
            this.stringToObjectId(id)
        );
        if (!movie) {
            return null;
        }

        return this.mapMovie(movie) as T;
    }
}
