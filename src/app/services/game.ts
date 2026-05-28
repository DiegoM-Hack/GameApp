import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api =
    'https://www.freetogame.com/api';

  constructor(
    private http: HttpClient
  ) {}

  // TODOS LOS JUEGOS
  getGames() {

    return this.http.get(
      `${this.api}/games`
    );
  }

  // POR CATEGORIA
  getByCategory(category: string) {

    return this.http.get(
      `${this.api}/games?category=${category}`
    );
  }

  // POR PLATAFORMA
  getByPlatform(platform: string) {

    return this.http.get(
      `${this.api}/games?platform=${platform}`
    );
  }

  // DETALLE
  getGame(id: number) {

    return this.http.get(
      `${this.api}/game?id=${id}`
    );
  }

}