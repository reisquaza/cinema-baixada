import { Movie } from "@/interfaces/Movie";
import {
    CinemarkMovieResult,
    CinemarkResponse,
    CinemarkSessionResult,
} from "../interfaces/Cinemark";

export class CinemarkService {
    public async getMovies(): Promise<CinemarkResponse<CinemarkMovieResult>> {
        const res = await fetch(
            process.env.CINEMARK_API_URL +
                "movies/onDisplayByTheater?theaterId=715&pageNumber=1&pageSize=99"
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

    public async getFormatedMovies(): Promise<Movie[]> {
        const data = await this.getMovies();
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
}
