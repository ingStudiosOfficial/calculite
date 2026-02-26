<script setup lang="ts">
import SettingsGroup from './SettingsGroup.vue';
import SettingsFooter from './SettingsFooter.vue';

import { fetchSettings, toggleStayAwake } from '../utilities/calculator_utils';
</script>

<template>
    <div class="settings-page-wrapper">
        <h1 class="settings-header">Settings</h1>
        <div class="settings-wrapper">
            <SettingsGroup title="Always stay awake" description="Prevents screen from sleeping when enabled" :enabled="fetchSettings().stayAwake" @toggle="toggleStayAwake"></SettingsGroup>
        </div>
        <SettingsFooter class="footer"></SettingsFooter>
    </div>
</template>

<style scoped>
.settings-page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90vw;
    height: 100%;
    background-color: transparent;
}

.settings-header {
    color: var(--md-sys-color-primary);
}

.settings-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 10px;
    width: 30vw;
}

.footer {
    width: 30vw;
    position: fixed;
    bottom: 25px;
    left: 50vw;
    transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
    .settings-wrapper {
        width: 70vw;
    }

    .footer {
        width: 70vw;
    }
}
</style>