import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

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
    private router: Router
  ) {}

  async login() {

    try {

      const { error } =
        await this.supabaseService.login(
          this.email,
          this.password
        );

      if (error) {

        alert(error.message);
        return;

      }

      alert('Login correcto');

      this.router.navigate(['/home']);

    } catch (err: any) {

      alert(err.message);

    }

  }

}