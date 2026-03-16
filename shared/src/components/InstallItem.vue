<script setup lang="ts">
import '@material/web/icon/icon.js';

interface ComponentProps {
    installName: string;
    installDesc: string;
    installAction: (params: unknown) => unknown;
    iconName: string;
}

const props = defineProps<ComponentProps>();
</script>

<template>
    <button class="install-item" @click="props.installAction">
        <md-ripple></md-ripple>
        <md-focus-ring style="--md-focus-ring-shape: 25px;"></md-focus-ring>
        <md-icon style="--md-icon-size: 35px;">{{ props.iconName }}</md-icon>
        <div class="install-content">
            <p class="install-name">{{ props.installName }}</p>
            <p>{{ props.installDesc }}</p>
        </div>
    </button>
</template>

<style scoped>
.install-item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    outline: none;
    border: none;
    font-family: var(--md-ref-typeface-plain);
    user-select: none;
    touch-action: manipulation;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    border-radius: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
}

.install-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 80%;
    text-align: right;
}

.install-name {
    font-size: 1.2rem;
}
</style>