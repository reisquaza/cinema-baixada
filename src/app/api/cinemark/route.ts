import { CinemarkServiceFactory } from "@/factories/CinemarkServiceFactory";
import { MovieServiceFactory } from "@/factories/MovieServiceFactory";
import { Movie } from "@/interfaces/Movie";
import { NextResponse } from "next/server";

export async function GET() {
    const theaterId = "67869dafb22e4dd19eb86193";
    const cinemarkMovies = await CinemarkServiceFactory.getFormatedMovies(
        theaterId
    );
    const movies: Movie[] = [];
    for (let index = 0; index < cinemarkMovies.length; index++) {
        const movie = await MovieServiceFactory.create(cinemarkMovies[index]);
        movies.push(movie);
    }
    return NextResponse.json(movies);
}
