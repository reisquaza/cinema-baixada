import { MovieComponent } from "./components/MovieComponent";
import { Movie } from "../interfaces/Movie";
import { MovieServiceFactory } from "@/factories/MovieServiceFactory";
import { CityServiceFactory } from "@/factories/CityServiceFactory";
import { TheaterServiceFactory } from "@/factories/TheaterServiceFactory";

export default async function Home() {
    const cities = await CityServiceFactory.get();
    const theater = await TheaterServiceFactory.getById(cities[0].theaters[0].id);
    const movies: Movie[] = await MovieServiceFactory.getByTheaterId(
        theater!.id
    );
    return (
        <div>
            {movies.map((movie) => (
                <MovieComponent movie={movie} key={movie.id} />
            ))}
        </div>
    );
}
