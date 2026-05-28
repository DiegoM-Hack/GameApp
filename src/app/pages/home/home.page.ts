import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg
} from '@ionic/angular/standalone';

import { GameService } from '../../services/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg
  ]
})
export class HomePage implements OnInit {

  games: any[] = [];

  constructor(
    private gameService: GameService
  ) {}

  ngOnInit() {

    this.loadGames();

  }

  loadGames() {

    this.gameService.getGames()
      .subscribe((data: any) => {

        console.log(data);

        this.games = data;

      });

  }

}
