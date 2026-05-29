import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';

import { FirebaseService }
from '../services/firebase';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon
  ]
})

export class Tab4Page
implements OnInit {

  encuestas: any[] = [];

  totalEncuestas: number = 0;

  totalComentarios: number = 0;

  juegos: string[] = [];

  constructor(
    private firebaseService:
    FirebaseService
  ) {}

  async cargarDashboard() {

    try {

      this.encuestas =
        await this.firebaseService
          .getSurveys();

      this.totalEncuestas =
        this.encuestas.length;

      this.totalComentarios =
        this.encuestas.filter(
          e => e.comentario
        ).length;

      this.juegos =
        [...new Set(

          this.encuestas.map(
            e => e.videojuego?.titulo
          )

        )];

    } catch(error) {

      console.log(error);

    }

  }

  ngOnInit() {

    this.cargarDashboard();

  }

}