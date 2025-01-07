import {
    CinemarkMovieResult,
    CinemarkResponse,
    CinemarkSessionResult,
} from "@/interfaces/Cinemark";
import { CinemarkService } from "@/service/CinemarkService";

export class CinemarkServiceFactory {
    public static async getMovies(): Promise<
        CinemarkResponse<CinemarkMovieResult>
    > {
        return new CinemarkService().getMovies();
    }

    public static async getMovieSession(
        cinemarkId: string
    ): Promise<CinemarkResponse<CinemarkSessionResult>> {
        return new CinemarkService().getMovieSession(cinemarkId);
    }
}
