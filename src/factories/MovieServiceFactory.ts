import { Movie, MovieDTO } from "@/interfaces/Movie";
import { CinemarkService } from "@/service/CinemarkService";
import { MongodbService } from "@/service/MongodbService";
import { MovieService } from "@/service/MovieService";

export class MovieServiceFactory {
    public static async create(movieDTO: MovieDTO): Promise<Omit<Movie, "id">> {
        const cinemarkService = new CinemarkService();
        const db = await MongodbService.db();
        const mongodbService = new MongodbService(db, "movie");
        return new MovieService(cinemarkService, mongodbService).create(
            movieDTO
        );
    }

    public static async getMovies(): Promise<Movie[]> {
        const cinemarkService = new CinemarkService();
        const db = await MongodbService.db();
        const mongodbService = new MongodbService(db, "movie");
        return new MovieService(cinemarkService, mongodbService).getMovies();
    }
}
