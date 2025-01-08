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

    public async getFormatedMovies(): Promise<Movie[]> {
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
                theater: {
                    id: "",

                    movieId: element.id,
                },
            };
            const sessions = await this.getMovieSession(element.id);

            sessions.dataResult.forEach((result) => {
                movie.sessions = this.formatSessions(result);
                console.log("total rooms:", result.rooms.length);
            });

            movies.push(movie);
        }

        return movies;
    }
}
