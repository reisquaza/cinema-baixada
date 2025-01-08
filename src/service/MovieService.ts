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

    public async create(movieDTO: MovieDTO): Promise<Movie> {
        const { id } = await this.repository.create(movieDTO);
        const movie: Movie = {
            id: id,
            ageIndication: movieDTO.ageIndication,
            duration: movieDTO.duration,
            genre: movieDTO.genre,
            imageUrl: movieDTO.imageUrl,
            name: movieDTO.name,
            sessions: movieDTO.sessions,
            slug: movieDTO.slug,
            theaterId: movieDTO.theaterId,
        };
        return movie;
    }

    public async getByTheaterId(theaterId: string): Promise<Movie[]> {
        const data = await this.repository.getBy<Movie>({
            theaterId: theaterId,
        });
        const movies: Movie[] = data.map((movie) => {
            return {
                id: movie.id,
                ageIndication: movie.ageIndication,
                duration: movie.duration,
                genre: movie.genre,
                imageUrl: movie.imageUrl,
                name: movie.name,
                sessions: movie.sessions,
                slug: movie.slug,
                theaterId: movie.theaterId
            };
        });
        return movies;
    }
}
