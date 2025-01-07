import { Movie, MovieDTO } from "../interfaces/Movies";
import { CinemarkService } from "./CinemarkService";

export class MovieService {
    private readonly cinemarkService: CinemarkService;

    constructor() {
        this.cinemarkService = new CinemarkService();
    }

    private async formatCinemark(): Promise<Movie[]> {
        const data = await CinemarkService
        return data.dataResult.map((m) => {
            return {
                id: m.id,
                name: m.name,
                slug: m.slug,
                genre: m.genre,
                duration: m.duration,
                imageUrl: m.assets[0].url,
                ageIndicator: m.ageIndicator,
                sessions: [],
            };
        });
    }

    public async getMovies(): Promise<Movie[]> {
        const response: Movie[] = [];
        const cinemarkMovies = await this.formatCinemark();
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
