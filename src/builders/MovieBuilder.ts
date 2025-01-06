import {
    AgeIndicator,
    Movie,
    MovieDTO,
    MovieSession,
} from "@/interfaces/Movies";
import { MovieService } from "@/service/MovieService";

export class MovieBuilder {
    private readonly movieService: MovieService;
    private readonly movieDTO: MovieDTO;

    constructor() {
        this.movieService = new MovieService();
        this.movieDTO = {
            ageIndicator: "L",
            duration: 0,
            genre: "",
            imageUrl: "",
            name: "",
            sessions: [],
        };
    }

    public setAgeIndicator(ageIndicator: AgeIndicator): MovieBuilder {
        this.movieDTO.ageIndicator = ageIndicator;
        return this;
    }
    public setDuration(duration: number): MovieBuilder {
        this.movieDTO.duration = duration;
        return this;
    }
    public setGenre(genre: string): MovieBuilder {
        this.movieDTO.genre = genre;
        return this;
    }
    public setImageUrl(imageUrl: string): MovieBuilder {
        this.movieDTO.imageUrl = imageUrl;
        return this;
    }
    public setName(name: string): MovieBuilder {
        this.movieDTO.name = name;
        return this;
    }
    public setSessions(sessions: MovieSession[]): MovieBuilder {
        this.movieDTO.sessions = sessions;
        return this;
    }
    public async build(): Promise<Movie> {
        return this.movieService.create(this.movieDTO);
    }
}
