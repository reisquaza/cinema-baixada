import { Movie, MovieSession } from "@/interfaces/Movie";
import {
    CinemarkMovieResult,
    CinemarkResponse,
    CinemarkSessionResult,
} from "../interfaces/Cinemark";
import { TheaterService } from "./TheaterService";

export class CinemarkService {
    private readonly theaterService: TheaterService;

    constructor(theaterService: TheaterService) {
        this.theaterService = theaterService;
    }

    public async getMovies(): Promise<CinemarkResponse<CinemarkMovieResult>> {
        const res = await fetch(
            process.env.CINEMARK_API_URL +
                "/movies/onDisplayByTheater?theaterId=709&pageNumber=1&pageSize=99"
        );
        return await res.json();
    }

    public async getMovieSession(
        cinemarkId: string
    ): Promise<CinemarkResponse<CinemarkSessionResult>> {
        const res = await fetch(
            process.env.CINEMARK_API_URL +
                `/sessions/movieAndTheater?movieId=${cinemarkId}&theaterId=709&pageNumber=1&pageSize=999`
        );
        return await res.json();
    }

    private formatSessions(dataResult: CinemarkSessionResult): MovieSession[] {
        const sessions: MovieSession[] = [];

        dataResult.rooms.forEach((room) => {
            room.sessions.forEach(({ date }) => {
                const movieSession: MovieSession = {
                    date: date,
                    room: room.number,
                };
                sessions.push(movieSession);
            });
        });

        return sessions;
    }

    public async getFormatedMovies(theaterId: string): Promise<Movie[]> {
        const theater = await this.theaterService.getById(theaterId);
        if (!theater) {
            throw new Error(`Theater ${theaterId} not found`);
        }
        const movies: Movie[] = [];
        const data = await this.getMovies();

        for (let i = 0; i < data.dataResult.length; i++) {
            const element = data.dataResult[i];
            const movie: Movie = {
                id: "",
                name: element.name,
                slug: element.slug,
                genre: element.genre,
                duration: element.duration,
                imageUrl: element.assets[0].url,
                ageIndication: element.ageIndication,
                sessions: [],
                originId: element.id,
                theater: {
                    id: theater.id,
                    originId: theater.originId,
                    name: theater.name,
                },
            };
            const sessions = await this.getMovieSession(element.id);

            sessions.dataResult.forEach((result) => {
                movie.sessions = this.formatSessions(result);
            });

            movies.push(movie);
        }

        return movies;
    }
}
