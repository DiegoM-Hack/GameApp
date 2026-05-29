  import { Injectable } from '@angular/core';
  import { createClient, SupabaseClient } from '@supabase/supabase-js';
  import { environment } from '../../environments/environment';
  import { Preferences } from '@capacitor/preferences';

  @Injectable({
    providedIn: 'root'
  })
  export class SupabaseService {

    private supabase: SupabaseClient;

    constructor() {

      this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey,

        {

    auth: {

      persistSession: true,

      autoRefreshToken: true,

      detectSessionInUrl: false

    }

  }
      );

    }

    // LOGIN
    async login(
  email: string,
  password: string
) {

  const response =
    await this.supabase.auth
      .signInWithPassword({

        email,
        password

      });

  return response;

}

    // REGISTER
    async register(
      nombre: string,
      email: string,
      password: string
    ) {

      // CREAR USUARIO
      const { data, error } =
        await this.supabase.auth.signUp({
          email,
          password
        });

      console.log(data);
      console.log(error);

      // ERROR DE AUTH
      if (error) {
        throw error;
      }

      // VALIDAR USUARIO
      if (!data.user) {
        throw new Error('No se pudo crear el usuario');
      }

      // REVISAR SI EL PERFIL YA EXISTE
      const { data: existingProfile } =
        await this.supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle();

      // SI NO EXISTE -> CREAR PERFIL
      if (!existingProfile) {

        const { error: profileError } =
          await this.supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              nombre,
              email
            });

        console.log(profileError);

        if (profileError) {
          throw profileError;
        }

      }

      return data;
    }

    // LOGOUT
    async logout() {

      const { error } =
        await this.supabase.auth.signOut();

      if (error) {
        console.log(error);
        throw error;
      }

    }

    // GUARDAR PERFIL
    async saveProfile(
      userId: string,
      nombre: string,
      email: string
    ) {

      const { data, error } =
        await this.supabase
          .from('profiles')
          .upsert(
            {
              id: userId,
              nombre,
              email
            },
            {
              onConflict: 'id'
            }
          );

      console.log(data);
      console.log(error);

      if (error) {
        throw error;
      }

      return data;
    }

    // OBTENER USUARIO
    async getUser() {

      const { data, error } =
        await this.supabase.auth.getUser();

      if (error) {
        console.log(error);
        throw error;
      }

      return data.user;
    }

    // OBTENER PERFIL
  async getProfile(userId: string) {
    return await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
  }
  // SUBIR AVATAR A STORAGE
  async uploadAvatar(userId: string, file: File): Promise<string> {

    const ext = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${ext}`;

    // Subir al bucket "avatars"
    const { error: uploadError } =
      await this.supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true   // reemplaza si ya existe
        });

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data } = this.supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // Guardar la URL en la tabla profiles
    const { error: updateError } =
      await this.supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  }
  }