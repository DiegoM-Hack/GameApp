import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';


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

  selector: 'app-tab2',

  templateUrl: 'tab2.page.html',

  styleUrls: ['tab2.page.scss'],
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

export class Tab2Page implements OnInit {

  encuestas: any[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {

    try {

      this.encuestas =
        await this.firebaseService
          .getSurveys();

      console.log(
        'ENCUESTAS:',
        this.encuestas
      );

    } catch(error) {

      console.log(error);

    }

  }

}