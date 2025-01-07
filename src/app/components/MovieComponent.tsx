import { Movie } from "../../interfaces/Movie";

interface MovieComponentProps {
    movie: Movie;
}

export function MovieComponent({ movie }: MovieComponentProps) {
    return (
        <div>
            <img src={movie.imageUrl} alt={movie.name} className="w-48 h-60" />
            <h3>{movie.name}</h3>
            <span>{movie.genre}</span>
        </div>
    );
}
