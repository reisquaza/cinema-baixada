import { CityServiceFactory } from "@/factories/CityServiceFactory";
import { TheaterServiceFactory } from "@/factories/TheaterServiceFactory";
import { CityDTO } from "@/interfaces/City";
import { TheaterDTO } from "@/interfaces/Theater";
import { NextResponse } from "next/server";

export async function GET() {
    const cityDTO: CityDTO = {
        name: "Santos",
        theaters: [],
    };
    const city = await CityServiceFactory.create(cityDTO);
    const theaterDTO: TheaterDTO = {
        city: { id: city.id, name: city.name },
        movies: [],
        name: "cinemark",
        url: "https://www.cinemark.com.br",
        originId: "706"
    };
    const theater = await TheaterServiceFactory.create(theaterDTO);
    return NextResponse.json(theater);
}
