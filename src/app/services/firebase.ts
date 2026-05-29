import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc
} from 'firebase/firestore';

import { environment }
from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private app = initializeApp(
    environment.firebaseConfig
  );

  private db = getFirestore(this.app);

  constructor() {}

  // GUARDAR ENCUESTA
  async saveSurvey(data: any) {

    try {

      const response = await addDoc(
        collection(this.db, 'encuestas'),
        data
      );

      console.log(
        'Guardado con ID:',
        response.id
      );

      return response;

    } catch(error) {

      console.log(error);

      throw error;

    }

  }

}