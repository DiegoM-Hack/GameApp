import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonButton
} from '@ionic/angular/standalone';

import { GameService } from '../../services/game';
import { Router } from '@angular/router';

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
    IonImg,
    IonButton
  ]
})
export class HomePage implements OnInit {

  games: any[] = [];

  constructor(
    private gameService: GameService, private router: Router
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

  //Funcion para ir a tabs
  goToTabs() {

    this.router.navigateByUrl('/tabs');
  }

}
