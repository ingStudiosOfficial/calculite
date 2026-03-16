<script setup lang="ts">
import InstallItem from './InstallItem.vue';
import { installAsApp } from '../utilities/pwa';

function openExtension() {
    window.open('https://chromewebstore.google.com/detail/calculite/pafhgocalnhibemiifonjnmddgmoedhc');
}
</script>

<template>
    <div class="install-page-wrapper">
        <h1 class="install-header">Install</h1>
        <div class="install-options">
            <InstallItem install-name="PWA" install-desc="Install Calculite as a Progressive Web App to get shortcuts and more features" :install-action="installAsApp" icon-name="install_desktop""></InstallItem>
            <InstallItem install-name="Chrome Extension" install-desc="Add Calculite to your browser as an Extension to get quick sidebar access, context menus and more" :install-action="openExtension" icon-name="extension"></InstallItem>
        </div>
    </div>
</template>

<style scoped>
.install-page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90vw;
    height: 100%;
    background-color: transparent;
}

.install-header {
    color: var(--md-sys-color-primary);
}

.install-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 30svw;
}

@media (max-width: 768px) {
    .install-options {
        width: 70svw;
    }
}
</style>