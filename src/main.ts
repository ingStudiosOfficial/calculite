import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import { fetchSettings } from './utilities/calculator_utils';
import { requestWakeLock } from './utilities/wakelock';

if (fetchSettings().stayAwake === true) {
    requestWakeLock();  
}

createApp(App).mount('#app');