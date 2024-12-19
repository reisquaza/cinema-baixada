import { MovieComponent } from "./components/MovieComponent";
import { movieFactory } from "./factories/MovieFactory";
import { Movie } from "./interfaces/Movies";

export default async function Home() {
    const movies: Movie[] = await movieFactory().getMovies();
    return (
        <div>
            {movies.map(movie => <MovieComponent movie={movie} key={movie.id} />)} 
        </div>
    );
}
