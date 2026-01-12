<script setup lang="ts">
import { ref, type PropType } from 'vue';

import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';
import '@material/web/icon/icon.js';

import { vibrate } from '../utilities/vibrate';

interface ButtonProps {
    value: string;
    display: string;
    color: 'primary' | 'secondary' | 'tertiary';
    type: 'standard' | 'scientific';
}

const props = defineProps<ButtonProps>();

const emit = defineEmits(['button-click']);

function handleButtonClick() {
    console.log('Button clicked!');

    if (props.value === 'CLEAR_ALL' || props.value === 'CALCULATE') {
        vibrate([10, 50, 10]);
    } else {
        vibrate([10]);
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
        break;
}
</script>

<template>
    <button class="number-button" :class="type === 'standard' ? 'standard' : 'scientific'" :style="'background-color:' + backgroundColor" @pointerdown.prevent="handleButtonClick">
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
    touch-action: manipulation;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}

.number-button.standard {
    font-size: 2em;
}

.number-button.scientific {
    font-size: 1.5em;
}

@media (prefers-color-scheme: dark) {
    .number-button {
        color: #ffffff;
    }
}
</style>