<script setup lang="ts">
import '@material/web/button/filled-button.js';
import '@material/web/icon/icon.js';
</script>

<template>
    <div class="content-wrapper">
        <img src="/chrome_icon.png" width="10%" />
        <p class="alert-text">Please note that this application works only on Chromium based browsers like Google Chrome (Desktop and Android).</p>
        <md-filled-button trailing-icon href="https://google.com/chrome">
            Get Google Chrome
            <svg slot="icon" viewBox="0 0 48 48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"/></svg>
        </md-filled-button>
    </div>
</template>

<style scoped>
.content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
}

.alert-text {
    font-size: 20px;
}
</style>