import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import { fetchSettings } from './utilities/calculator_utils';
import { requestWakeLock } from './utilities/wakelock';

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/calculite/service_worker.js')
        .then(() => console.log('Service Worker registered.'))
        .catch((err) => console.log('Service Worker registration failed:', err));
}

if (fetchSettings().stayAwake === true) {
    await requestWakeLock();  
}

createApp(App).mount('#app');