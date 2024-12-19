import { Movie } from "../interfaces/Movies";
import { CinemarkService } from "./CinemarkService";

export class MovieService {
    private readonly cinemarkService: CinemarkService;

    constructor() {
        this.cinemarkService = new CinemarkService()
    }

    private async formatCinemark(): Promise<Movie[]> {
        const data = await this.cinemarkService.getMovies()
        return data.dataResult.map(m => {
            return { id: m.id, name: m.name, slug: m.slug, genre: m.genre, duration: m.duration, posterUrl: m.assets[0].url, ageIndicator: m.ageIndicator }
        })
    }

    public async getMovies(): Promise<Movie[]> {
        const response: Movie[] = [];
        const cinemarkMovies = await this.formatCinemark();
        cinemarkMovies.forEach(element => {
           response.push(element) 
        });
        return response;
    }
}
