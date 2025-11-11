<script setup lang="ts">
import { ref } from 'vue';

import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';

const props = defineProps({
    value: String,
    display: String,
    color: String,
});

const emit = defineEmits(['button-click']);

function handleButtonClick() {
    console.log('Button clicked!');
    emit('button-click', props);
}

const backgroundColor = ref('#ffffff');

switch (props.color) {
    case 'primary':
        backgroundColor.value = 'var(--md-sys-color-primary-container)';
        break;
    case 'secondary':
        backgroundColor.value = 'var(--md-sys-color-secondary-container)';
        break;
    case 'tertiary':
        backgroundColor.value = 'var(--md-sys-color-tertiary-container)';
        break;
    default:
        backgroundColor.value = '#ffffff';
}
</script>

<template>
    <button class="number-button" :style="'background-color:' + backgroundColor" @click="handleButtonClick">
        <md-ripple></md-ripple>
        <md-focus-ring style="--md-focus-ring-shape: 25px;"></md-focus-ring>
        {{ props.display?.replace(/\s/g, "") }}
    </button>
</template>

<style scoped>
.number-button {
    all: unset;
    position: relative;
    color: #000000;
    border-radius: 25px;
    text-align: center;
    font-size: 2em;
}
</style>