import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs 
} from 'firebase/firestore';

import {

  getStorage,
  ref,
  uploadString,
  getDownloadURL

} from 'firebase/storage';

import {
  getDocs
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
  private storage =
  getStorage(this.app);

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

  // OBTENER ENCUESTAS
async getSurveys() {
  try {

    const querySnapshot = await getDocs(
      collection(this.db, 'encuestas')
    );

    const encuestas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return encuestas;

  } catch(error) {
    console.log(error);
    throw error;
  }
}

  async uploadImage(imageBase64: string) {

  try {

    const fileName =
      `encuestas/${Date.now()}.jpg`;

    const storageRef =
      ref(this.storage, fileName);

    await uploadString(

      storageRef,

      imageBase64,

      'data_url'

    );

    const imageUrl =
      await getDownloadURL(storageRef);

    return imageUrl;

  } catch(error) {

    console.log(error);

    throw error;

  }

  }

  async getSurveys() {

  try {

    const querySnapshot =
      await getDocs(
        collection(this.db, 'encuestas')
      );

    const surveys: any[] = [];

    querySnapshot.forEach((doc) => {

      surveys.push({

        id: doc.id,

        ...doc.data()

      });

    });

    return surveys;

  } catch(error) {

    console.log(error);

    throw error;

  }

}

}