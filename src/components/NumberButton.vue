<script setup lang="ts">
import { ref } from 'vue';

import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';
import '@material/web/icon/icon.js'

const props = defineProps({
    value: String,
    display: String,
    color: String,
});

const emit = defineEmits(['button-click']);

function handleButtonClick() {
    console.log('Button clicked!');

    // Haptic feedback for mobile
    if (navigator.vibrate) {
        if (props.value === 'CLEAR_ALL' || props.value === 'CALCULATE') {
            navigator.vibrate([10, 50, 10]);
        } else {
            navigator.vibrate([10]);
        }
    }

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
        <md-ripple class="button-attachments"></md-ripple>
        <md-focus-ring style="--md-focus-ring-shape: 25px;" class="button-attachments"></md-focus-ring>
        <md-icon v-if="props.value === 'BACKSPACE'">backspace</md-icon>
        <span v-else>{{ props.display?.trim() }}</span>
    </button>
</template>

<style scoped>
.number-button {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #000000;
    border-radius: 25px;
    text-align: center;
    font-size: 2em;
    user-select: none;
}
</style>