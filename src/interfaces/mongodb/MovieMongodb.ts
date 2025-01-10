import { WithId } from "mongodb";
import { Movie, MovieTheater } from "../Movie";

export interface MovieMongodb extends Omit<Omit<Movie, "id">, "theater"> {
    theater: WithId<Omit<MovieTheater, "id">>;
}
