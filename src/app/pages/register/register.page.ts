import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class RegisterPage {

  nombre = '';
  email = '';
  password = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async register() {

    try {

      await this.supabaseService.register(
        this.nombre,
        this.email,
        this.password
      );

      alert('Usuario registrado');

      this.router.navigate(['/login']);

    } catch (err: any) {

      alert(err.message);

    }

  }

}