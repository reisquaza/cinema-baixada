import { MovieComponent } from "./components/MovieComponent";
import { Movie } from "../interfaces/Movies";
import { MovieService } from "@/service/MovieService";

export default async function Home() {
    const movies: Movie[] = await MovieService.getMovies();

    return (
        <div>
            {movies.map((movie) => (
                <MovieComponent movie={movie} key={movie.id} />
            ))}
        </div>
    );
}
