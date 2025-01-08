import { Repository } from "@/interfaces/Repository";
import { Movie, MovieDTO } from "../interfaces/Movie";
import { CinemarkService } from "./CinemarkService";

export class MovieService {
    private readonly cinemarkService: CinemarkService;
    private readonly repository: Repository;

    constructor(cinemarkService: CinemarkService, repository: Repository) {
        this.cinemarkService = cinemarkService;
        this.repository = repository;
    }

    public async getMovies(): Promise<Movie[]> {
        const response: Movie[] = [];
        const cinemarkMovies = await this.cinemarkService.getFormatedMovies();
        cinemarkMovies.forEach((element) => {
            response.push(element);
        });
        return response;
    }

    public async create(movieDTO: MovieDTO): Promise<Omit<Movie, "id">> {
        const movie: Omit<Movie, "id"> = {
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

    public async save(movie: Omit<Movie, "id">): Promise<Movie> {
        const { id } = await this.repository.create(movie);
        return { id, ...movie };
    }
}
