import { Movie, MovieDTO } from "@/interfaces/Movie";
import { MongodbRepository } from "@/repositories/mongodb/MongodbRepository";
import { MovieService } from "@/service/MovieService";
import { TheaterService } from "@/service/TheaterService";
import { CityMongodbRepository } from "@/repositories/mongodb/CityMongodbRepository";
import { CityService } from "@/service/CityService";

export class MovieServiceFactory {
    private static async getParams() {
        const db = await MongodbRepository.db();
        const CityRepository = new CityMongodbRepository(db);
        const repository = new MongodbRepository(db, "movie");
        const cityService = new CityService(CityRepository);
        const theaterService = new TheaterService(repository, cityService);
        return { db, CityRepository, repository, cityService, theaterService };
    }

    public static async create(movieDTO: MovieDTO): Promise<Omit<Movie, "id">> {
        const { repository, theaterService } =
            await MovieServiceFactory.getParams();
        return await new MovieService(repository, theaterService).create(
            movieDTO
        );
    }
}
