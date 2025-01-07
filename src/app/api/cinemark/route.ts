import { CinemarkServiceFactory } from "@/factories/CinemarkServiceFactory";
import { Movie } from "@/interfaces/Movies";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await CinemarkServiceFactory.getMovies();
  const response: Movie[] = data.dataResult.map((m) => {
    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      genre: m.genre,
      duration: m.duration,
      imageUrl: m.assets[0].url,
      ageIndicator: m.ageIndicator,
      sessions: [],
    };
  });

  return NextResponse.json(response);
}
