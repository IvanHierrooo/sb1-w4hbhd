import { Application } from '@nativescript/core';
import { WebView } from '@nativescript/core';

// Configuración global de WebView para PWA
WebView.enableZoomDefault = true;

// Registrar manejadores de eventos para estado offline/online
Application.on(Application.resumeEvent, () => {
    console.log("Aplicación resumida");
});

Application.on(Application.suspendEvent, () => {
    console.log("Aplicación suspendida");
});

Application.run({ moduleName: 'app-root' });