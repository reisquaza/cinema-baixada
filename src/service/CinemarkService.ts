import { CinemarkMovie } from "../interfaces/Cinemark";

export class CinemarkService {
    super() {}

    static async getMovies(): Promise<CinemarkMovie> {
        const res = await fetch(
            process.env.CINEMARK_API_URL +
                "movies/onDisplayByTheater?theaterId=715&pageNumber=1&pageSize=99"
        );
        const data: CinemarkMovie = await res.json();
        return data;
    }
}
