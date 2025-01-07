import { Movie, MovieDTO } from "@/interfaces/Movies";
import { CinemarkService } from "@/service/CinemarkService";
import { MovieService } from "@/service/MovieService";

export class MovieServiceFactory {
    public static create(movieDTO: MovieDTO): Promise<Movie> {
        const cinemarkService = new CinemarkService();
        return new MovieService(cinemarkService).create(movieDTO);
    }

    public static getMovies(): Promise<Movie[]> {
        const cinemarkService = new CinemarkService();
        return new MovieService(cinemarkService).getMovies();
    }
}
