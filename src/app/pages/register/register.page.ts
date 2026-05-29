import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class RegisterPage {

  nombre = '';
  email = '';
  password = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async showToast(
  message: string,
  color: string = 'primary'
) {

  const toast = await this.toastController.create({
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

  async register() {

    try {

      await this.supabaseService.register(
        this.nombre,
        this.email,
        this.password
      );

      await this.showToast(
        'Usuario registrado correctamente ',
        'success'
      );

      this.router.navigate(['/login']);

    } catch (err: any) {

      await this.showToast(
        err.message,
        'danger'
      );

    }

  }

}