import { Repository } from "@/interfaces/Repository";
import { Movie, MovieDTO } from "../interfaces/Movie";
import { TheaterService } from "./TheaterService";

export class MovieService {
    private readonly theaterService: TheaterService;
    private readonly repository: Repository;

    constructor(repository: Repository, theaterService: TheaterService) {
        this.theaterService = theaterService;
        this.repository = repository;
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
            originId: movieDTO.theater.originId,
            theater: {
                id: movieDTO.theater.id,
                name: movieDTO.theater.name,
                originId: movieDTO.theater.originId,
            },
        };
        return movie;
    }

    public async getByTheaterId(theaterId: string): Promise<Movie[]> {
        const theater = await this.theaterService.getById(theaterId);
        if (!theater) {
            throw new Error(`Theater ${theaterId} not found`);
        }
        const data = await this.repository.getBy<Movie>({
            theater: {
                id: theater.id,
                name: theater.name,
                originId: theater.originId,
            },
        });
        const movies: Movie[] = data.map((movie: Movie) => {
            return {
                id: movie.id,
                ageIndication: movie.ageIndication,
                duration: movie.duration,
                genre: movie.genre,
                imageUrl: movie.imageUrl,
                name: movie.name,
                sessions: movie.sessions,
                slug: movie.slug,
                originId: movie.originId,
                theater: {
                    id: movie.theater.id,
                    name: movie.theater.name,
                    originId: movie.theater.originId,
                },
            };
        });
        return movies;
    }
}
