import { MovieComponent } from "./components/MovieComponent";
import { Movie } from "../interfaces/Movie";
import { MovieServiceFactory } from "@/factories/MovieServiceFactory";

export default async function Home() {
    const movies: Movie[] = await MovieServiceFactory.getMovies();
    console.log("Movies :", movies);
    return (
        <div>
            {movies.map((movie) => (
                <MovieComponent movie={movie} key={movie.id} />
            ))}
        </div>
    );
}
