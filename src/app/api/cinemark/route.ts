import { Movie } from "@/app/interfaces/Movies"
import { CinemarkService } from "@/app/service/CinemarkService"
import { NextResponse } from "next/server"

export async function GET() {
    const cinemarkService = new CinemarkService()
    const data = await cinemarkService.getMovies()
    const response: Movie[] = data.dataResult.map(m => {
        return { id: m.id, name: m.name, slug: m.slug, genre: m.genre, duration: m.duration, posterUrl: m.assets[0].url, ageIndicator: m.ageIndicator }
    })

    return NextResponse.json(response)
} 
