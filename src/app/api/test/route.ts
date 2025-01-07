import { MovieServiceFactory } from "@/factories/MovieServiceFactory";
import { NextResponse } from "next/server";

export async function GET() {
  const test = await fetch(
    "https://www.veloxtickets.com/Portal/Local/Cinema/Santos/Roxy-5-Gonzaga/GOZ"
  );
  const text = await test.text();
  const movies = await MovieServiceFactory.getMovies();
  const res: number[] = [];
  movies.forEach((movie) => {
    res.push(text.indexOf(movie.name));
  });
  console.log(text);
  return NextResponse.json(res);
}
