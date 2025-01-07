import { CinemarkMovie } from "@/interfaces/Cinemark";
import { CinemarkService } from "@/service/CinemarkService";

export class CinemarkServiceFactory {
  static async getMovies(): Promise<CinemarkMovie> {
    return new CinemarkService().getMovies();
  }
}
