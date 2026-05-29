import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  ToastController
} from '@ionic/angular';

import {
  Router,
  RouterModule
} from '@angular/router';
import { Keyboard }
from '@capacitor/keyboard';
import { OnInit } from '@angular/core';

import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  // TOAST FLOTANTE
  async showToast(
    message: string,
    color: string = 'primary'
  ) {

    const toast =
      await this.toastController.create({

      message,
      duration: 2500,
      position: 'top',
      color,

      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]

    });

    await toast.present();

  }

  // LOGIN
  async login() {

  console.log('LOGIN START');

  try {

    const response =
      await this.supabaseService.login(
        this.email,
        this.password
      );

    console.log(response);

    if(response.error) {

      alert(response.error.message);

      return;

    }

    alert('LOGIN OK');
    this.router.navigateByUrl('/tabs/tab1');

  } catch(err) {

    console.log(err);

    alert(JSON.stringify(err));

  }

}

  ngOnInit() {

  Keyboard.setAccessoryBarVisible({
    isVisible: false
  });

}

  

}