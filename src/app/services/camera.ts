import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  private PHOTO_STORAGE: string = 'photos';

  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: true,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  public async selectFromGallery() {

  const selectedPhoto = await Camera.getPhoto({

    resultType: CameraResultType.Base64,

    source: CameraSource.Photos,

    quality: 100

  });

  const savedImageFile =
    await this.savePicture(selectedPhoto);

  this.photos.unshift(savedImageFile);

  Preferences.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos),
  });

}

 private async savePicture(photo: Photo) {

  let base64Data: string;

  // Si la cámara devuelve base64
  if(photo.base64String) {

    base64Data = photo.base64String;

  } else {

    const response =
      await fetch(photo.webPath!);

    const blob =
      await response.blob();

    const converted =
      await this.convertBlobToBase64(blob) as string;

    // Quitamos el prefijo
    base64Data =
      converted.split(',')[1];

  }

  const fileName =
    `Montaluisa_${Date.now()}.jpeg`;

  await Filesystem.writeFile({

    path: fileName,

    data: base64Data,

    directory: Directory.Data

  });

  return {

    filepath: fileName,

    webviewPath:
      `data:image/jpeg;base64,${base64Data}`,

    base64String: base64Data

  };

}

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const { value: photoList } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (photoList ? JSON.parse(photoList) : []) as UserPhoto[];

    // If running on the web...
    if (!this.platform.is('hybrid')) {
      for (let photo of this.photos) {
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
}



export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  base64String?: string;
}

