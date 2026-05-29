import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {

  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon

} from '@ionic/angular/standalone';

import {
  personOutline,
  locationOutline
} from 'ionicons/icons';

import { addIcons }
from 'ionicons';

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

  surveys: any[] = [];

  constructor(

    private firebaseService:
      FirebaseService

  ) {

    addIcons({
      personOutline,
      locationOutline
    });

  }

  ngOnInit() {

    this.loadSurveys();

  }

  async loadSurveys() {

    this.surveys =
      await this.firebaseService
        .getSurveys();

    console.log(this.surveys);

  }

}