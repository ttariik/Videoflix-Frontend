# VideoFlix 🎬

<div align="center">
  <img src="/public/assets/img/logo.svg" alt="VideoFlix Logo" width="20"/>
  <img src="/public/assets/img/text_logo.svg" alt="VideoFlix Logo" width="100"/>
</div>

<div align="center">
  <h2><a href="#-english">English</a> | <a href="#-deutsch">Deutsch</a></h2>
</div>

---

# 🇬🇧 ENGLISH

## 📝 Description

VideoFlix is a modern video streaming platform built with Angular 18. It offers a Netflix-like experience with a beautiful user interface and smooth video playback functionality. The application is responsive, ensuring an optimal viewing experience across a wide range of devices from desktop computers to mobile phones.

## 🚀 Features

- **User Authentication System**
  - Secure login and registration
  - JWT-based authentication
  - Remember me functionality
  - Account management
  
- **Password Management**
  - Forgot password functionality
  - Secure password reset process
  - Strong password validation
  
- **Video Playback**
  - High-quality HLS video streaming
  - Adaptive bitrate streaming
  - Custom video player with Plyr integration
  - Fullscreen mode
  - Playback speed control
  
- **User Interface**
  - Responsive design for all devices
  - Dark mode theme
  - Modern card-based video layout
  - Intuitive navigation
  
- **Video Content Management**
  - Video categories and filtering
  - Detailed video description pages
  - Video recommendations
  
- **Legal Pages**
  - Privacy Policy page
  - Imprint page
  
- **Performance Optimization**
  - Lazy loading for better performance
  - Angular optimizations for fast loading times
  - Efficient state management

## 🛠️ Technology Stack

### Frontend Framework
- **Angular 18**: The latest version of Angular framework providing a robust foundation
- **TypeScript**: For type-safe code and better developer experience
- **RxJS**: For reactive programming and handling asynchronous operations

### Styling
- **SCSS**: Advanced CSS preprocessor for complex styling needs
- **Responsive Design**: Media queries and flexible layouts for all screen sizes
- **Custom Animations**: Smooth transitions and interactions

### Video Technology
- **HLS.js**: HTTP Live Streaming implementation for adaptive streaming
- **Video.js**: Underlying video framework
- **Plyr**: Enhanced HTML5 video player with a clean interface

### Development Tools
- **Angular CLI**: For project scaffolding and development workflow
- **Jasmine/Karma**: For unit testing
- **ESLint/TSLint**: For code quality and standardization

## 🔧 Project Architecture

The application follows Angular best practices with a component-based architecture:

```
src/
├── app/
│   ├── components/              # Reusable UI components
│   │   ├── footer/
│   │   ├── header/
│   │   └── ...
│   ├── pages/                   # Page components
│   │   ├── login/
│   │   ├── signup/
│   │   ├── resetpassword/
│   │   ├── video-player/
│   │   └── ...
│   ├── services/                # Angular services
│   │   ├── auth.service.ts
│   │   ├── video.service.ts
│   │   └── ...
│   ├── interfaces/              # TypeScript interfaces
│   ├── guards/                  # Route guards
│   └── pipes/                   # Custom Angular pipes
├── assets/                      # Static assets
│   ├── img/
│   └── icons/
├── environments/                # Environment configurations
└── styles/                      # Global styles
```

## 🔍 Development Approach

The project was developed using the following approach:

1. **Component-Based Development**: Breaking down the UI into reusable components
2. **Reactive Programming**: Using RxJS for state management and asynchronous operations
3. **Mobile-First Design**: Ensuring responsive design across all devices
4. **Testing Strategy**: Unit tests for critical components and services
5. **Lazy Loading**: Loading feature modules on demand for better performance

## 🚀 Setup & Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## 📋 Available Scripts

- `npm start`: Start the development server
- `npm run build`: Build the application for production
- `npm run watch`: Build and watch for changes
- `npm test`: Run unit tests
- `npm run lint`: Run linting checks
- `npm run e2e`: Run end-to-end tests

## 🧪 Testing

The application uses Jasmine and Karma for unit testing. To run tests:

```bash
npm test
```

## 🌐 Deployment

For production deployment:

1. Build the production version
```bash
npm run build --prod
```

2. The built files will be in the `dist/` directory, ready to be deployed to any static hosting service

---

# 🇩🇪 DEUTSCH

## 📝 Beschreibung

VideoFlix ist eine moderne Video-Streaming-Plattform, die mit Angular 18 entwickelt wurde. Sie bietet ein Netflix-ähnliches Erlebnis mit einer ansprechenden Benutzeroberfläche und reibungsloser Videowiedergabefunktion. Die Anwendung ist responsiv und gewährleistet ein optimales Seherlebnis auf einer Vielzahl von Geräten, von Desktop-Computern bis hin zu Mobiltelefonen.

## 🚀 Funktionen

- **Benutzerauthentifizierungssystem**
  - Sichere Anmeldung und Registrierung
  - JWT-basierte Authentifizierung
  - "Angemeldet bleiben"-Funktionalität
  - Kontoverwaltung
  
- **Passwortverwaltung**
  - "Passwort vergessen"-Funktionalität
  - Sicherer Passwort-Reset-Prozess
  - Starke Passwortvalidierung
  
- **Videowiedergabe**
  - HLS-Videostreaming in hoher Qualität
  - Adaptive Bitratenwiedergabe
  - Benutzerdefinierter Videoplayer mit Plyr-Integration
  - Vollbildmodus
  - Steuerung der Wiedergabegeschwindigkeit
  
- **Benutzeroberfläche**
  - Responsives Design für alle Geräte
  - Dark-Mode-Thema
  - Modernes kartenbasiertes Video-Layout
  - Intuitive Navigation
  
- **Videoinhaltsmanagement**
  - Videokategorien und -filterung
  - Detaillierte Videobeschreibungsseiten
  - Videoempfehlungen
  
- **Rechtsseiten**
  - Datenschutzrichtlinien-Seite
  - Impressum-Seite
  
- **Leistungsoptimierung**
  - Lazy Loading für bessere Performance
  - Angular-Optimierungen für schnelle Ladezeiten
  - Effizientes State-Management

## 🛠️ Technologie-Stack

### Frontend-Framework
- **Angular 18**: Die neueste Version des Angular-Frameworks, die eine robuste Grundlage bietet
- **TypeScript**: Für typsicheren Code und bessere Entwicklererfahrung
- **RxJS**: Für reaktive Programmierung und Verwaltung asynchroner Operationen

### Styling
- **SCSS**: Fortgeschrittener CSS-Präprozessor für komplexe Styling-Anforderungen
- **Responsives Design**: Media Queries und flexible Layouts für alle Bildschirmgrößen
- **Benutzerdefinierte Animationen**: Reibungslose Übergänge und Interaktionen

### Video-Technologie
- **HLS.js**: HTTP Live Streaming-Implementierung für adaptives Streaming
- **Video.js**: Zugrundeliegendes Video-Framework
- **Plyr**: Erweiterter HTML5-Videoplayer mit einer übersichtlichen Benutzeroberfläche

### Entwicklungstools
- **Angular CLI**: Für Projekt-Scaffolding und Entwicklungs-Workflow
- **Jasmine/Karma**: Für Unit-Tests
- **ESLint/TSLint**: Für Codequalität und Standardisierung

## 🔧 Projektarchitektur

Die Anwendung folgt Angular-Best-Practices mit einer komponentenbasierten Architektur:

```
src/
├── app/
│   ├── components/              # Wiederverwendbare UI-Komponenten
│   │   ├── footer/
│   │   ├── header/
│   │   └── ...
│   ├── pages/                   # Seitenkomponenten
│   │   ├── login/
│   │   ├── signup/
│   │   ├── resetpassword/
│   │   ├── video-player/
│   │   └── ...
│   ├── services/                # Angular-Dienste
│   │   ├── auth.service.ts
│   │   ├── video.service.ts
│   │   └── ...
│   ├── interfaces/              # TypeScript-Schnittstellen
│   ├── guards/                  # Routenschutz
│   └── pipes/                   # Benutzerdefinierte Angular-Pipes
├── assets/                      # Statische Assets
│   ├── img/
│   └── icons/
├── environments/                # Umgebungskonfigurationen
└── styles/                      # Globale Stile
```

## 🔍 Entwicklungsansatz

Das Projekt wurde unter Verwendung der folgenden Ansätze entwickelt:

1. **Komponentenbasierte Entwicklung**: Aufteilung der Benutzeroberfläche in wiederverwendbare Komponenten
2. **Reaktive Programmierung**: Verwendung von RxJS für State-Management und asynchrone Operationen
3. **Mobile-First-Design**: Sicherstellung eines responsiven Designs auf allen Geräten
4. **Teststrategie**: Unit-Tests für kritische Komponenten und Dienste
5. **Lazy Loading**: Laden von Funktionsmodulen bei Bedarf für bessere Leistung

## 🚀 Einrichtung & Installation

1. Repository klonen
```bash
git clone [repository-url]
```

2. Abhängigkeiten installieren
```bash
npm install
```

3. Entwicklungsserver starten
```bash
npm start
```

4. Browser öffnen und zu `http://localhost:4200` navigieren

## 📋 Verfügbare Skripte

- `npm start`: Startet den Entwicklungsserver
- `npm run build`: Baut die Anwendung für die Produktion
- `npm run watch`: Baut die Anwendung und überwacht Änderungen
- `npm test`: Führt Unit-Tests aus
- `npm run lint`: Führt Linting-Prüfungen durch
- `npm run e2e`: Führt End-to-End-Tests aus

## 🧪 Tests

Die Anwendung verwendet Jasmine und Karma für Unit-Tests. Um Tests auszuführen:

```bash
npm test
```

## 🌐 Bereitstellung

Für die Produktionsbereitstellung:

1. Bauen Sie die Produktionsversion
```bash
npm run build --prod
```

2. Die gebauten Dateien befinden sich im Verzeichnis `dist/` und sind bereit für die Bereitstellung auf einem beliebigen statischen Hosting-Dienst

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

Author: Tarik Sabanovic 
