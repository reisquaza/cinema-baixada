import { Movie, MovieDTO } from "@/interfaces/Movies";
import { MovieService } from "@/service/MovieService";

export class MovieServiceFactory {
  static async getMovies(): Promise<Movie[]> {
    return new MovieService().getMovies();
  }

  static async create(movieDTO: MovieDTO): Promise<Movie> {
    return new MovieService().create(movieDTO);
  }
}
