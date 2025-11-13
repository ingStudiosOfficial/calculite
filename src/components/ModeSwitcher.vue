<script setup lang="ts">
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

const emit = defineEmits(['mode-change']);

function switchMode(mode: string) {
    if (navigator.vibrate) {
        navigator.vibrate([10]);
    }

    emit('mode-change', mode);
}
</script>

<template>
    <div class="switcher">
        <md-icon-button class="mode-button" @click="switchMode('standard')">
            <md-icon>calculate</md-icon>
        </md-icon-button>
        <md-icon-button class="mode-button" @click="switchMode('scientific')">
            <md-icon>science</md-icon>
        </md-icon-button>
    </div>
</template>

<style scoped>
.switcher {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    background-color: var(--md-sys-color-surface-variant);
    color: var(--md-sys-color-on-surface-variant);
    width: fit-content;
    border-radius: 25px;
    padding: 5px;
}

.mode-button {
    --md-icon-button-container-width: 50px;
    --md-icon-button-container-height: 50px;
}
</style>