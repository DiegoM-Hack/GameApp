# 🎮 GameSurvey App

Aplicación móvil desarrollada con **Ionic + Angular + Capacitor** que permite registrar encuestas sobre videojuegos favoritos dentro del campus universitario, incluyendo información del usuario, ubicación GPS, fotografías y datos obtenidos desde una API externa de videojuegos.

## 📱 Características

### ✅ Autenticación

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Integración con Supabase Authentication

### ✅ Encuestas Gamer

Registro de:

- Nombre o alias
- Edad aproximada
- Rol:
  - Estudiante
  - Docente
  - Administrativo
  - Visitante
- Videojuego favorito
- Comentario personal

### ✅ Información del videojuego

Consulta de videojuegos mediante API externa.

Muestra:

- Nombre
- Imagen
- Género
- Plataforma
- Descripción

### ✅ Geolocalización

Obtención automática de:

- Latitud
- Longitud
- Fecha
- Hora

Utilizando Capacitor Geolocation.

### ✅ Cámara y Galería

Permite:

- Tomar fotografías
- Seleccionar imágenes desde la galería

Utilizando Capacitor Camera.

### ✅ Firebase Storage

1. Usuario selecciona una foto.
2. La imagen se sube a Firebase Storage.
3. Se obtiene una URL pública.
4. La URL se guarda en Firestore.

### ✅ Publicaciones

Visualización de encuestas registradas mediante cards.

Cada publicación muestra:

- Imagen
- Alias
- Videojuego favorito
- Comentario
- Ubicación
- Fecha

---

## 🚀 Tecnologías utilizadas

### Frontend

- Angular
- Ionic Framework
- TypeScript
- SCSS

### Backend y Servicios

- Supabase Auth
- Firebase Firestore
- Firebase Storage

### Plugins Capacitor

- Camera
- Geolocation
- Filesystem
- Preferences

### API Externa

- FreeToGame API
- Posible migración futura a RAWG API

---

## 📂 Estructura del proyecto

```text
src/
│
├── app/
│
├── services/
│   ├── supabase.service.ts
│   ├── firebase.service.ts
│   ├── game.service.ts
│   ├── location.service.ts
│   └── camera.service.ts
│
├── tab1/
├── tab2/
├── login/
├── register/
│
└── environments/
```

---

## ⚙️ Instalación

### Clonar repositorio

```bash
git clone https://github.com/DiegoM-Hack/GameApp.git
cd GameApp
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar proyecto

```bash
ionic serve
```

---

## 📦 Generar APK Android

```bash
ionic build
npx cap add android
npx cap sync
npx cap open android
```

---

## 🔑 Configuración

### Supabase

Configurar:

- supabaseUrl
- supabaseKey

### Firebase

Configurar:

- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

---

## 🔐 Permisos Android

Agregar en AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
```

---

## 🎯 Objetivo

Crear una aplicación móvil para recopilar información sobre preferencias de videojuegos dentro del entorno universitario integrando:

- APIs externas
- Geolocalización
- Cámara
- Firebase
- Supabase
- Ionic Framework

---

## 👨‍💻 Autor

**Diego Montaluisa**

GitHub: https://github.com/DiegoM-Hack

Repositorio: https://github.com/DiegoM-Hack/GameApp
