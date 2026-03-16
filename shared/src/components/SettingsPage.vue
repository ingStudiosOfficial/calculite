<script setup lang="ts">
import SettingsGroupSwitch from './SettingsGroupSwitch.vue';
import SettingsFooter from './SettingsFooter.vue';
import SettingsGroupColor from './SettingsGroupColor.vue';
import { fetchSettings, getTheme, setTheme, toggleStayAwake } from '../utilities/calculator_utils';
</script>

<template>
    <div class="settings-page-wrapper">
        <h1 class="settings-header">Settings</h1>
        <div class="settings-wrapper">
            <SettingsGroupSwitch title="Always stay awake" description="Prevents screen from sleeping when enabled" :enabled="fetchSettings().stayAwake" @toggle="toggleStayAwake"></SettingsGroupSwitch>
            <SettingsGroupColor title="Theme" description="Changes the theme" :default-color="getTheme()" @color-change="setTheme"></SettingsGroupColor>
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
    width: 30svw;
}

.footer {
    width: 30svw;
    position: fixed;
    bottom: 25px;
    left: 50svw;
    transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
    .settings-wrapper {
        width: 70svw;
    }

    .footer {
        width: 70svw;
    }
}
</style>