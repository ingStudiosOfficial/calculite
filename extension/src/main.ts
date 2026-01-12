import { createApp } from 'vue';
import App from './App.vue';
import '@calculite/shared/src/assets/main.css';
import { fetchSettings } from '@calculite/shared/src/utilities/calculator_utils';
import { requestWakeLock, wakeLockListener } from '@calculite/shared/src/utilities/wakelock';

if (fetchSettings().stayAwake === true) {
    requestWakeLock();
}

wakeLockListener();

createApp(App).mount('#app');