<script setup lang="ts">
import { ref, provide } from 'vue';

import NumPad from './NumPad.vue';
import OutputBox from './OutputBox.vue';

import { calculate } from '../utilities/calculator_utils';

interface Button {
    value: string;
    display: string;
    color: string;
}

// Keywords
const KEYWORDS: string[] = [
    "CLEAR_ALL",
    "CALCULATE",
];

const equation = ref<string[]>([]);
const displayEquation = ref<string[]>([]);

const calculatedResult = ref(0);

// Handle events bubbled up from NumPad
function handleButtonClick(props: any) {
    console.log('Calculator received button click:', props);

    if (!props || !props.value) {
        console.log('Button clicked is null.');
        return;
    }

    const buttonClickedObject: string = props.value;
    console.log('Button clicked value:', buttonClickedObject);

    if (KEYWORDS.includes(buttonClickedObject)) {
        switch (buttonClickedObject) {
            case "CLEAR_ALL":
                equation.value = [];
                displayEquation.value = [];
                break;
            case "CALCULATE":
                calculatedResult.value = calculate(equation.value);
                break;
            default:
                console.log('Unexpected keyword:', buttonClickedObject);
        }

        return;
    }

    equation.value.push(props.value);
    displayEquation.value.push(props.display);
}
</script>

<template>
    <div class="calculator-box">
        <OutputBox :equation="displayEquation" :latest-output="calculatedResult"></OutputBox>
        <NumPad @button-click="handleButtonClick"></NumPad>
    </div>
</template>

<style scoped>
.calculator-box {
    width: 90vw;
    height: 90vh;
    background-color: transparent;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;
    gap: 10px;
}
</style>