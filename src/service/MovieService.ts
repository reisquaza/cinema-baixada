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
}
