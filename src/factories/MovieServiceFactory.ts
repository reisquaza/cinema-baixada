import { Movie, MovieDTO } from "@/interfaces/Movie";
import { MongodbRepository } from "@/repositories/mongodb/MongodbRepository";
import { MovieService } from "@/service/MovieService";
import { TheaterServiceFactory } from "./TheaterServiceFactory";

export class MovieServiceFactory {
    public static async build() {
        const db = await MongodbRepository.db();
        const repository = new MongodbRepository(db, "movie");
        const theaterService = await TheaterServiceFactory.build();
        return new MovieService(repository, theaterService);
    }

    public static async create(movieDTO: MovieDTO): Promise<Omit<Movie, "id">> {
        const movieService = await this.build();
        return await movieService.create(movieDTO);
    }

    public static async getByTheaterId(theaterId: string) {
        
    }
}
