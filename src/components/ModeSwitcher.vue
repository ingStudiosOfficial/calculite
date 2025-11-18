<script setup lang="ts">
import { ref } from 'vue';

import '@material/web/icon/icon.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';

import { getCalculatorMode } from '@/utilities/calculator_utils';

const emit = defineEmits(['mode-change']);

const currentMode = ref<string>(getCalculatorMode());

function switchMode(mode: string) {
    console.log('Switching to:', mode);

    if (navigator.vibrate) {
        navigator.vibrate([10]);
    }

    emit('mode-change', mode);
}
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
        </md-tabs>
        <md-divider></md-divider>
        <!--
        <md-icon-button class="mode-button" @click="switchMode('standard')">
            <md-icon>calculate</md-icon>
        </md-icon-button>
        <md-icon-button class="mode-button" @click="switchMode('scientific')">
            <md-icon>science</md-icon>
        </md-icon-button>
        -->
        <!--
        <md-icon-button class="mode-button" @click="switchMode('unit')">
            <md-icon>autorenew</md-icon>
        </md-icon-button>
        -->
    </div>
</template>

<style scoped>
.tabs {
    margin: 10px 0;
}
</style>