import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class Tab3Page implements OnInit {

  profile: any = null;
  avatarUrl: string | null = null;
  createdAt: string = '—';
  isLoading = true;
  isUploading = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadProfile();
  }

  // Recarga al volver a la tab
  async ionViewWillEnter() {
    await this.loadProfile();
  }

  // ── Cargar perfil ───────────────────────────────
  async loadProfile() {
    this.isLoading = true;
    try {

      const user = await this.supabaseService.getUser();

      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      // Fecha de registro
      if (user.created_at) {
        this.createdAt = new Date(user.created_at)
          .toLocaleDateString('es-EC', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
      }

      // Traer perfil desde la tabla profiles
      const { data, error } = await this.supabaseService
        .getProfile(user.id);

      if (error) throw error;

      this.profile = data;

      // Cargar avatar si existe
      if (data?.avatar_url) {
        this.avatarUrl = data.avatar_url;
      }

    } catch (err: any) {
      alert(err.message);
    } finally {
      this.isLoading = false;
    }
  }

  // ── Seleccionar y subir imagen ──────────────────
  async pickImage() {

    // Input file nativo (compatible con Ionic Web/PWA)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: any) => {
      const file: File = event.target.files[0];
      if (!file) return;

      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no puede superar los 2MB');
        return;
      }

      this.isUploading = true;

      try {
        const user = await this.supabaseService.getUser();
        if (!user) return;

        const url = await this.supabaseService
          .uploadAvatar(user.id, file);

        this.avatarUrl = url;
        this.profile = { ...this.profile, avatar_url: url };

      } catch (err: any) {
        alert(err.message);
      } finally {
        this.isUploading = false;
      }
    };

    input.click();
  }

  // ── Cerrar sesión ───────────────────────────────
  async logout() {
    try {
      await this.supabaseService.logout();
      this.router.navigate(['/login']);
    } catch (err: any) {
      alert(err.message);
    }
  }

}