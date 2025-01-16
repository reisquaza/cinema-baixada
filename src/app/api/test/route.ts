import { CityServiceFactory } from "@/factories/CityServiceFactory";
import { TheaterServiceFactory } from "@/factories/TheaterServiceFactory";
import { CityDTO } from "@/interfaces/City";
import { TheaterDTO } from "@/interfaces/Theater";
import { NextResponse } from "next/server";

export async function GET() {
    const city: CityDTO = {
        name: "SANTOS",
        theaters: [],
    };
    const { id } = await CityServiceFactory.create(city);
    const theaterDTO: TheaterDTO = {
        city: {
            id,
            name: city.name,
        },
        movies: [],
        name: "CINEMARK",
        originId: "709",
        url: "https://cinemark.com.br",
    };
    const theater = await TheaterServiceFactory.create(theaterDTO);
    return NextResponse.json(theater);
}
