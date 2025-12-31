import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import { fetchSettings } from './utilities/calculator_utils';
import { requestWakeLock, wakeLockListener } from './utilities/wakelock';

if (fetchSettings().stayAwake === true) {
    requestWakeLock();
}

wakeLockListener();

createApp(App).mount('#app');