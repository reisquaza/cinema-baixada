import { CinemarkMovie } from "@/app/interfaces/Cinemark"
import { Movie } from "@/app/interfaces/Movies"
import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch("https://br-www-frontend-ext-prod.cinemark.com.br/bff-api/v1/movies/onDisplayByTheater?theaterId=715&pageNumber=1&pageSize=9")
    const data: CinemarkMovie = await res.json()

    const response: Movie[] = data.dataResult.map(m => {
        return { id: m.id, name: m.name, slug: m.slug, genre: m.genre, duration: m.duration, posterUrl: m.assets[0].url, ageIndicator: m.ageIndicator }
    })

    return NextResponse.json(response)
} 
