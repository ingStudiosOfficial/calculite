<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import '@material/web/icon/icon.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import '@material/web/iconbutton/icon-button.js';

import { getCalculatorMode, type CalculatorType } from '../utilities/calculator_utils';
import { vibrate } from '../utilities/vibrate';
import { MdTabs } from '@material/web/tabs/tabs.js';

type AppType = 'website' | 'extension';

interface ComponentProps {
    mode: CalculatorType;
    appType: AppType;
}

const props = defineProps<ComponentProps>();

const emit = defineEmits(['mode-change']);

const localMode = ref<CalculatorType>();
const tabsRef = ref<MdTabs>();
const modeToIndex: Record<CalculatorType, number> = {
    'standard': 0,
    'scientific': 1,
    'conversion': 2,
    'history': 3,
    'settings': 4,
    'install': 5,
};

function switchMode(mode: CalculatorType) {
    console.log('Switching to:', mode);

    vibrate([6]);

    localMode.value = mode;

    emit('mode-change', mode);
}

function toggleMobileOpen() {
    vibrate([6]);

    const menu = document.getElementById('mobile-menu') as any;

    menu.open = !menu.open;
}

function goBack() {
    vibrate([6]);
    window.history.back();
}

watch(() => props.mode, (newMode) => {
    localMode.value = newMode;

    if (tabsRef.value) {
        tabsRef.value.activeTabIndex = modeToIndex[newMode];
    }
}, { immediate: true });

onMounted(() => {    
    const currentMode = getCalculatorMode();
    localMode.value = currentMode;

    if (tabsRef.value) {
        tabsRef.value.activeTabIndex = modeToIndex[currentMode];
    }
});
</script>

<template>
    <div class="switcher">
        <md-tabs class="tabs" ref="tabsRef">
            <md-primary-tab @click="switchMode('standard')">
                <md-icon slot="icon">calculate</md-icon>
                Standard
            </md-primary-tab>
            <md-primary-tab @click="switchMode('scientific')">
                <md-icon slot="icon">science</md-icon>
                Scientific
            </md-primary-tab>
            <md-primary-tab @click="switchMode('conversion')">
                <md-icon slot="icon">autorenew</md-icon>
                Conversion (Beta)
            </md-primary-tab>
            <md-primary-tab @click="switchMode('history')">
                <md-icon slot="icon">history</md-icon>
                History
            </md-primary-tab>
            <md-primary-tab @click="switchMode('settings')">
                <md-icon slot="icon">settings</md-icon>
                Settings
            </md-primary-tab>
            <md-primary-tab v-if="props.appType !== 'extension'" @click="switchMode('install')">
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
                <div slot="headline">Conversion (Beta)</div>
                <md-icon slot="start">autorenew</md-icon>
            </md-menu-item>
        </md-menu>
        <md-icon-button v-if="props.mode !== 'history'" class="switcher-button" @click="switchMode('history')">
            <md-icon>history</md-icon>
        </md-icon-button>
        <md-icon-button v-else class="switcher-button" @click="goBack()">
            <md-icon>arrow_back</md-icon>
        </md-icon-button>
        <md-icon-button v-if="props.mode !== 'settings'" class="switcher-button" @click="switchMode('settings')">
            <md-icon>settings</md-icon>
        </md-icon-button>
        <md-icon-button v-else class="switcher-button" @click="goBack()">
            <md-icon>arrow_back</md-icon>
        </md-icon-button>
        <md-icon-button class="switcher-button" v-if="props.appType !== 'extension'" @click="switchMode('install')">
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