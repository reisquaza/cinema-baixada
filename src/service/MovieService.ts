import { Movie, MovieDTO } from "../interfaces/Movie";
import { CinemarkService } from "./CinemarkService";

export class MovieService {
    private readonly cinemarkService: CinemarkService;

    constructor(cinemarkService: CinemarkService) {
        this.cinemarkService = cinemarkService;
    }

    public async getMovies(): Promise<Movie[]> {
        const response: Movie[] = [];
        const cinemarkMovies = await this.cinemarkService.getFormatedMovies();
        console.log("cnmovies", cinemarkMovies);
        cinemarkMovies.forEach((element) => {
            response.push(element);
        });
        return response;
    }

    public async create(movieDTO: MovieDTO): Promise<Movie> {
        const movie: Movie = {
            id: "",
            ageIndicator: movieDTO.ageIndicator,
            duration: movieDTO.duration,
            genre: movieDTO.genre,
            imageUrl: movieDTO.imageUrl,
            name: movieDTO.name,
            slug: movieDTO.name,
            sessions: movieDTO.sessions,
        };
        return movie;
    }
}
