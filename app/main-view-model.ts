import { Observable, WebView } from '@nativescript/core';

export class MainViewModel extends Observable {
    private _webUrl: string;
    private _isLoading: boolean;

    constructor() {
        super();
        // Cambiamos a la versión PWA de la web
        this._webUrl = 'https://www.arkcutt.com';
        this._isLoading = true;
    }

    get webUrl(): string {
        return this._webUrl;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    onWebViewLoaded(args) {
        const webview = args.object as WebView;
        
        // Configuración optimizada para PWA
        webview.headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        };

        // Inyectamos código para habilitar características PWA
        const pwaEnableScript = `
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(
                        function(registration) {
                            console.log('ServiceWorker registration successful');
                        },
                        function(err) {
                            console.log('ServiceWorker registration failed: ', err);
                        }
                    );
                });
            }
        `;

        webview.on(WebView.loadFinishedEvent, () => {
            this.isLoading = false;
            webview.executeJavaScript(pwaEnableScript);
        });

        webview.on(WebView.loadStartedEvent, () => {
            this.isLoading = true;
        });

        webview.on(WebView.loadErrorEvent, (args) => {
            console.error("Error de carga:", args.error);
            this.isLoading = false;
        });
    }
}