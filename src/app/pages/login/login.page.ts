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
export class LoginPage {

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

    try {

      await this.supabaseService.login(
        this.email,
        this.password
      );

      await this.showToast(
        'Inicio de sesión correcto 🎮',
        'success'
      );

      this.router.navigate(['']);

    } catch (err: any) {

      await this.showToast(
        err.message,
        'danger'
      );

    }

  }

}