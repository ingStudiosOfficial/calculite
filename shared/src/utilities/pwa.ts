import { vibrate } from "./vibrate";

let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;
});

export async function installAsApp() {
    vibrate([6]);

    if (!deferredPrompt) {
        console.log('Install prompt not yet available.');
        alert("You can't install Calculite as an app right now.");
        return;
    }

    deferredPrompt?.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log('User response to install prompt:', outcome);

    deferredPrompt = null;
}

export function isAppInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches 
        || (window.navigator as any).standalone === true;
}