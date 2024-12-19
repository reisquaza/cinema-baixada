import { MovieService } from "../service/MovieService";

export function movieFactory(): MovieService {
    const movieService = new MovieService();
    return movieService;
}
