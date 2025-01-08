import {
    CinemarkMovieResult,
    CinemarkResponse,
    CinemarkSessionResult,
} from "@/interfaces/Cinemark";
import { Movie } from "@/interfaces/Movie";
import { CinemarkService } from "@/service/CinemarkService";

export class CinemarkServiceFactory {
    public static async getMovies(): Promise<
        CinemarkResponse<CinemarkMovieResult>
    > {
        return await new CinemarkService().getMovies();
    }

    public static async getMovieSession(
        cinemarkId: string
    ): Promise<CinemarkResponse<CinemarkSessionResult>> {
        return new CinemarkService().getMovieSession(cinemarkId);
    }

    public static async getFormatedMovies(): Promise<Movie[]> {
        return new CinemarkService().getFormatedMovies();
    }
}
