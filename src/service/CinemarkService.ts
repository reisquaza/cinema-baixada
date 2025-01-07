import { Movie, MovieSession } from "@/interfaces/Movie";
import {
    CinemarkMovieResult,
    CinemarkResponse,
    CinemarkSessionResult,
} from "../interfaces/Cinemark";

export class CinemarkService {
    public async getMovies(): Promise<CinemarkResponse<CinemarkMovieResult>> {
        const res = await fetch(
            process.env.CINEMARK_API_URL +
                "/movies/onDisplayByTheater?theaterId=715&pageNumber=1&pageSize=99"
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

    public async getFormatedMovies(): Promise<Movie[]> {
        const movies: Movie[] = [];
        const data = await this.getMovies();
        data.dataResult.forEach(async (m) => {
            const movie: Movie = {
                id: m.id,
                name: m.name,
                slug: m.slug,
                genre: m.genre,
                duration: m.duration,
                imageUrl: m.assets[0].url,
                ageIndicator: m.ageIndicator,
                sessions: [],
            };
            const sessions = await this.getMovieSession(m.id);

            sessions.dataResult.forEach((result) => {
                movie.sessions = this.formatSessions(result);
            });

            movies.push(movie);
        });

        return movies;
    }
}
