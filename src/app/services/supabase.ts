import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // LOGIN
  async login(email: string, password: string) {

    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  // REGISTER
  async register(
    nombre: string,
    email: string,
    password: string
  ) {

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    // Guardar perfil adicional
    if (data.user) {

      await this.saveProfile(
        data.user.id,
        nombre,
        email
      );
    }

    return data;
  }

  // LOGOUT
  async logout() {

    return await this.supabase.auth.signOut();
  }

  // GUARDAR PERFIL
  async saveProfile(
    userId: string,
    nombre: string,
    email: string
  ) {

    return await this.supabase
      .from('profiles')
      .upsert({
        id: userId,
        nombre,
        email
      });
  }

  // OBTENER USUARIO
  async getUser() {

    return await this.supabase.auth.getUser();
  }

}