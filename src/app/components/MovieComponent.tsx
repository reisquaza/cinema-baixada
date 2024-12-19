import { Movie } from "../interfaces/Movies";

interface MovieComponentProps {
    movie: Movie;
}

export function MovieComponent({ movie }: MovieComponentProps) {
    return (
        <div>
            <img src={movie.posterUrl} alt={movie.name} className="w-48 h-60"/>
            <h3>{movie.name}</h3>
            <span>{movie.genre}</span>
        </div>
    )
}
