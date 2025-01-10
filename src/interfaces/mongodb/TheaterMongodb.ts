import { WithId } from "mongodb";
import { Theater, TheaterMovie } from "../Theater";

export interface TheaterMongodb extends Omit<Omit<Theater, "id">, "movies"> {
    movies: WithId<Omit<TheaterMovie, "id">>[];
}
