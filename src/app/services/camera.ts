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
      resultType: CameraResultType.Uri,
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

    resultType: CameraResultType.Uri,

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
    let base64Data: string | Blob;

    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!,
      });

      base64Data = file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      base64Data = (await this.convertBlobToBase64(blob)) as string;
    }

    // Write the file to the data directory
   const fileName = `Montaluisa_${Date.now()}.jpeg`;

const savedFile = await Filesystem.writeFile({
  path: fileName,
  data: base64Data,
  directory: Directory.Data,
});

const fileUri = savedFile.uri;

return {
  filepath: fileName,
  webviewPath: Capacitor.convertFileSrc(fileUri),
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
}

