<script setup lang="ts">
import '@material/web/switch/switch.js';
import { vibrate } from '../utilities/vibrate';
import { ref } from 'vue';

interface ComponentProps {
    title: string;
    description: string;
    defaultColor: string;
}

const props = defineProps<ComponentProps>();

const emit = defineEmits(['colorChange']);
const seedColor = ref<string>(props.defaultColor);

function onColorChange() {
    vibrate([6]);
    emit('colorChange', seedColor.value);
}
</script>

<template>
    <div class="settings-group">
        <div class="left">
            <p class="title">{{ props.title }}</p>
            <p class="description">{{ props.description }}</p>
        </div>
        <input v-model="seedColor" type="color" @input="onColorChange()" />
    </div>
</template>

<style scoped>
.settings-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    border-radius: 25px;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    padding: 10px;
    box-sizing: border-box;
}

.title {
    font-size: 1.5em;
}

.description {
    font-size: 1em;
}

.left {
    text-align: left;
}
</style>