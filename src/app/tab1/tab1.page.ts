import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService }
from '../services/firebase';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton
  ]
})

export class Tab1Page {
  constructor(
    private firebaseService: FirebaseService
  ) {}

  async guardarEncuesta() {

  const encuesta = {

    nombre: 'Diego',

    edad: '20-25',

    rol: 'estudiante',

    videojuego: 'Fortnite',

    plataforma: 'PC',

    genero: 'Shooter',

    comentario: 'Buen juego',

    fecha: new Date()

  };

  await this.firebaseService
    .saveSurvey(encuesta);

}
}
