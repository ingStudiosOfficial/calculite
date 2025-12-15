<script setup lang="ts">
import { onMounted, ref } from 'vue';

import '@material/web/icon/icon.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/menu/menu.js';
import '@material/web/iconbutton/icon-button.js';

import { getCalculatorMode } from '@/utilities/calculator_utils';
import { vibrate } from '@/utilities/vibrate';

const emit = defineEmits(['mode-change']);

const currentMode = ref<string>(getCalculatorMode());
const hideInstall = ref<boolean>(false);

function switchMode(mode: string) {
    console.log('Switching to:', mode);

    vibrate([10]);

    emit('mode-change', mode);
}

let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;
});

async function installAsApp() {
    vibrate([10]);

    if (!deferredPrompt) {
        console.log('Install prompt not yet available.');
        alert("You can't install Calculite as an app right now.");
        return;
    }

    deferredPrompt?.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log('User response to install prompt:', outcome);

    deferredPrompt = null;
    hideInstall.value = true;
}

function isAppInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches 
        || (window.navigator as any).standalone === true;
}

function toggleMobileOpen() {
    vibrate([10]);

    const menu = document.getElementById('mobile-menu') as any;

    menu.open = !menu.open;
}

onMounted(() => {
    hideInstall.value = isAppInstalled();
});
</script>

<template>
    <div class="switcher">
        <md-tabs class="tabs">
            <md-primary-tab :selected="currentMode === 'standard'" @click="switchMode('standard')">
                <md-icon slot="icon">calculate</md-icon>
                Standard
            </md-primary-tab>
            <md-primary-tab :selected="currentMode === 'scientific'" @click="switchMode('scientific')">
                <md-icon slot="icon">science</md-icon>
                Scientific
            </md-primary-tab>
            <md-primary-tab :selected="currentMode === 'conversion'" @click="switchMode('conversion')">
                <md-icon slot="icon">autorenew</md-icon>
                Conversion
            </md-primary-tab>
            <md-primary-tab :selected="currentMode === 'settings'" @click="switchMode('settings')">
                <md-icon slot="icon">settings</md-icon>
                Settings
            </md-primary-tab>
            <md-primary-tab v-show="!hideInstall" @click="installAsApp()">
                <md-icon slot="icon">install_desktop</md-icon>
                Install
            </md-primary-tab>
        </md-tabs>
    </div>

    <div class="mobile-switcher">
        <md-icon-button id="menu-button" class="switcher-button" @click="toggleMobileOpen()">
            <md-icon>swap_horiz</md-icon>
        </md-icon-button>
        <md-menu id="mobile-menu" anchor="menu-button" positioning="popover">
            <md-menu-item @click="switchMode('standard')">
                <div slot="headline">Standard</div>
                <md-icon slot="start">calculate</md-icon>
            </md-menu-item>
            <md-menu-item @click="switchMode('scientific')">
                <div slot="headline">Scientific</div>
                <md-icon slot="start">science</md-icon>
            </md-menu-item>
            <md-menu-item @click="switchMode('conversion')">
                <div slot="headline">Conversion</div>
                <md-icon slot="start">autorenew</md-icon>
            </md-menu-item>
        </md-menu>
        <md-icon-button class="switcher-button" @click="switchMode('settings')">
            <md-icon>settings</md-icon>
        </md-icon-button>
        <md-icon-button class="switcher-button" v-show="!hideInstall" @click="installAsApp()">
            <md-icon>install_desktop</md-icon>
        </md-icon-button>
    </div>
</template>

<style scoped>
.tabs {
    margin: 10px 0;
}

.mobile-switcher {
    display: none;
}

@media (max-width: 768px) {
    .switcher {
        display: none;
    }

    .mobile-switcher {
        display: block;
        margin: 10px 0;
        position: relative;
    }

    .switcher-button {
        --md-icon-button-icon-size: 30px;
        margin: 0 5px;
    }
}
</style>