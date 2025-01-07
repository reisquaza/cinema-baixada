import { MovieComponent } from "./components/MovieComponent";
import { Movie } from "../interfaces/Movies";
import { MovieServiceFactory } from "@/factories/MovieServiceFactory";

export default async function Home() {
    const movies: Movie[] = await MovieServiceFactory.getMovies();

    return (
        <div>
            {movies.map((movie) => (
                <MovieComponent movie={movie} key={movie.id} />
            ))}
        </div>
    );
}
