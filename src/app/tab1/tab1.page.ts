import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService }
from '../services/firebase';
import { GameService }
from '../services/game';
import { LocationService }
from '../services/location';
import { OnInit } from '@angular/core';
import { PhotoService }
from '../services/camera';

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
  IonButton,
  IonImg
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
    IonButton,
    IonImg
  ]
})

export class Tab1Page implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private gameService: GameService,
    private locationService: LocationService,
    private photoService: PhotoService
  ) {}

  games: any[] = [];

  filteredGames: any[] = [];

  selectedGame: any = null;

  searchTerm: string = '';

  latitud: number = 0;

  longitud: number = 0;

  fecha: string = '';

  nombre: string = '';

  edad: number | null = null;

  rol: string = '';

  comentario: string = '';

  selectedPhoto: string = '';

  

  async guardarEncuesta() {

    if(!this.selectedGame) {

  alert('Selecciona un juego');

  return;

}

  let imageUrl = '';

if(this.selectedPhoto) {

  const base64Image =
    await this.imageToBase64(
      this.selectedPhoto
    );

  imageUrl =
    await this.firebaseService
      .uploadImage(base64Image);

}

  try {

    const encuesta = {

      nombre: this.nombre,

      edad: this.edad,

      rol: this.rol,

      comentario: this.comentario,

      videojuego: {

        id: this.selectedGame.id,

        titulo: this.selectedGame.title,

        genero: this.selectedGame.genre,

        plataforma: this.selectedGame.platform,

        descripcion:
          this.selectedGame.short_description

      },

      imagen: imageUrl,

      latitud: this.latitud,

      longitud: this.longitud,

      fecha: this.fecha

    };

    await this.firebaseService
      .saveSurvey(encuesta);

    console.log(
      'Encuesta guardada'
    );

  } catch(error) {

    console.log(error);

  }

}

  searchGame() {

    if(this.searchTerm.trim() === '') {

      this.filteredGames = [];
      return;

    }

    this.gameService.searchGames(
      this.searchTerm
    )
    .subscribe((data: any[]) => {

      this.filteredGames =
        data.filter(game =>

          game.title
            .toLowerCase()
            .includes(
              this.searchTerm.toLowerCase()
            )

        ).slice(0, 10);

    });

  }

  selectGame(game: any) {

  this.selectedGame = game;

  this.searchTerm = game.title;

  this.filteredGames = [];

}

async getLocation() {

  try {

    // Pedir permisos
    await this.locationService
      .ensurePermissions();

    // Obtener ubicación
    const position =
      await this.locationService
        .getCurrentPosition();

    this.latitud =
      position.coords.latitude;

    this.longitud =
      position.coords.longitude;

    console.log(
      this.latitud,
      this.longitud
    );

  } catch(error) {

    console.log(error);

  }

}

async takePhoto() {

  await this.photoService
    .addNewToGallery();

  this.selectedPhoto =
    this.photoService.photos[0]
      .webviewPath || '';

}

async selectPhoto() {

  await this.photoService
    .selectFromGallery();

  this.selectedPhoto =
    this.photoService.photos[0]
      .webviewPath || '';

}

async imageToBase64(imageUrl: string) {

  const response =
    await fetch(imageUrl);

  const blob =
    await response.blob();

  return await new Promise<string>((resolve) => {

    const reader =
      new FileReader();

    reader.onloadend = () => {

      resolve(
        reader.result as string
      );

    };

    reader.readAsDataURL(blob);

  });

}

getDateTime() {

  const now = new Date();

  this.fecha =
    now.toLocaleString();

}

ngOnInit() {

  this.getLocation();

  this.getDateTime();

}

}
