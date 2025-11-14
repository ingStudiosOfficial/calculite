<script setup lang="ts">
import { ref } from 'vue';

import NumberButton from './NumberButton.vue';

interface Button {
    value: string;
    display: string;
    color: string;
}

const buttons = ref([
    {
        value: "SQRT",
        display: "√",
        color: "secondary",
    },
    {
        value: "CBRT",
        display: "∛",
        color: "secondary",
    },
    {
        value: "PI",
        display: "π",
        color: "secondary",
    },
    {
        value: "**",
        display: "^",
        color: "secondary",
    },
    {
        value: "**2",
        display: "²",
        color: "secondary",
    },
    {
        value: "FACTORIAL",
        display: "!",
        color: "secondary",
    },
    {
        value: "SIN",
        display: "sin",
        color: "secondary",
    },
    {
        value: "COS",
        display: "cos",
        color: "secondary",
    },
    {
        value: "TAN",
        display: "tan",
        color: "secondary",
    },
    {
        value: "EULER",
        display: "𝑒",
        color: "secondary",
    },
    {
        value: "LOG",
        display: "log",
        color: "secondary",
    },
    {
        value: "MOD",
        display: "mod",
        color: "secondary",
    },
    {
        value: "CLEAR_ALL",
        display: "AC",
        color: "primary",
    },
    {
        value: "PARENTHESES",
        display: "( )",
        color: "secondary",
    },
    {
        value: "/100",
        display: "%",
        color: "secondary",
    },
    {
        value: "/",
        display: " ÷ ",
        color: "secondary",
    },
    {
        value: "7",
        display: "7",
        color: "tertiary",
    },
    {
        value: "8",
        display: "8",
        color: "tertiary",
    },
    {
        value: "9",
        display: "9",
        color: "tertiary",
    },
    {
        value: "*",
        display: " × ",
        color: "secondary",
    },
    {
        value: "4",
        display: "4",
        color: "tertiary",
    },
    {
        value: "5",
        display: "5",
        color: "tertiary",
    },
    {
        value: "6",
        display: "6",
        color: "tertiary",
    },
    {
        value: "-",
        display: " - ",
        color: "secondary",
    },
    {
        value: "1",
        display: "1",
        color: "tertiary",
    },
    {
        value: "2",
        display: "2",
        color: "tertiary",
    },
    {
        value: "3",
        display: "3",
        color: "tertiary",
    },
    {
        value: "+",
        display: " + ",
        color: "secondary",
    },
    {
        value: "0",
        display: "0",
        color: "tertiary",
    },
    {
        value: ".",
        display: ".",
        color: "tertiary",
    },
    {
        value: "BACKSPACE",
        display: "←",
        color: "tertiary",
    },
    {
        value: "CALCULATE",
        display: "=",
        color: "primary",
    },
]);

// Define emit to pass events up to Calculator
const emit = defineEmits(['button-click']);

// Handler to receive from NumberButton and pass to Calculator
function handleButtonClick(props: any) {
    emit('button-click', props);
}
</script>

<template>
    <div class="numpad">
        <NumberButton v-for="button in buttons" :value="button.value" :display="button.display" :color="button.color" type="scientific" @button-click="handleButtonClick"></NumberButton>
    </div>
</template>

<style scoped>
.numpad {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 10px;
    border-radius: 10px;
}
</style>