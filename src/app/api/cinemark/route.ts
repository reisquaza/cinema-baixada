import { CinemarkServiceFactory } from "@/factories/CinemarkServiceFactory";
import { MovieServiceFactory } from "@/factories/MovieServiceFactory";
import { NextResponse } from "next/server";

export async function GET() {
    const movies = await CinemarkServiceFactory.getFormatedMovies();
    for (let index = 0; index < movies.length; index++) {
        // await MovieServiceFactory.create(movies[index]);
    }
    return NextResponse.json(movies);
}
