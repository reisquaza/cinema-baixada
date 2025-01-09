import { CinemarkResponse, CinemarkSessionResult } from "@/interfaces/Cinemark";
import { Movie } from "@/interfaces/Movie";
import { CinemarkService } from "@/service/CinemarkService";
import { TheaterServiceFactory } from "./TheaterServiceFactory";

export class CinemarkServiceFactory {
    public static async build() {
        const theaterService = await TheaterServiceFactory.build();
        return new CinemarkService(theaterService);
    }

    public static async getMovies() {
        const cinemarkService = await CinemarkServiceFactory.build();
        return await cinemarkService.getMovies();
    }

    public static async getMovieSession(
        cinemarkId: string
    ): Promise<CinemarkResponse<CinemarkSessionResult>> {
        const cinemarkService = await CinemarkServiceFactory.build();
        return await cinemarkService.getMovieSession(cinemarkId);
    }

    public static async getFormatedMovies(theaterId: string): Promise<Movie[]> {
        const cinemarkService = await CinemarkServiceFactory.build();
        return await cinemarkService.getFormatedMovies(theaterId);
    }
}
