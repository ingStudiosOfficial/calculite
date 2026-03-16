import { createApp } from 'vue';
import App from './App.vue';
import '@calculite/shared/src/assets/main.css';
import { fetchSettings, setDocumentTheme } from '@calculite/shared/src/utilities/calculator_utils';
import { requestWakeLock, wakeLockListener } from '@calculite/shared/src/utilities/wakelock';

const settings = fetchSettings();

if (settings.stayAwake === true) {
    requestWakeLock();
}

setDocumentTheme(settings.theme);

wakeLockListener();

createApp(App).mount('#app');