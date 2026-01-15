<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';

import NumPad from './NumPad.vue';
import OutputBox from './OutputBox.vue';

import { calculate } from '../utilities/calculator_utils';

// Keywords
const KEYWORDS: string[] = [
    "CLEAR_ALL",
    "CALCULATE",
    "BACKSPACE",
    "PARENTHESES",
];

// Operators
const OPERATORS: string[] = [
    "/",
    "*",
    "-",
    "+",
];

const props = defineProps({
   equation: String,
   result: String, 
});

const equation = ref<string[]>([]);
const displayEquation = ref<string[]>([]);

const calculatedResult = ref<number | string>('');

// Handle events bubbled up from NumPad
function handleButtonClick(props: any) {
    console.log('Calculator received button click:', props);

    if (!props || !props.value) {
        console.log('Button clicked is null.');
        return;
    }

    const buttonClickedObject: string = props.value;
    console.log('Button clicked value:', buttonClickedObject);

    // Check for keywords
    if (KEYWORDS.includes(buttonClickedObject)) {
        switch (buttonClickedObject) {
            case "CLEAR_ALL":
                equation.value = [];
                displayEquation.value = [];
                calculatedResult.value = ''
                break;

            case "CALCULATE":
                if (equation.value.length !== 0) {
                    calculatedResult.value = calculate(equation.value);
                }
                
                break;

            case "BACKSPACE":
                equation.value.pop();
                displayEquation.value.pop();
                break;

            case "PARENTHESES":
                if (OPERATORS.includes(equation.value[equation.value.length - 1] as string) || !equation.value[equation.value.length - 1]) {
                    equation.value.push("(");
                    displayEquation.value.push("(");
                } else {
                    equation.value.push(")");
                    displayEquation.value.push(")");
                }

                break;

            default:
                console.error('Unexpected keyword:', buttonClickedObject);
                break;
        }

        return;
    }

    // Push the value to the array in each equation
    equation.value.push(props.value);
    displayEquation.value.push(props.display);
}

function listenForInput() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            return;
        } else if (e.key === 'Enter') {
            if (equation.value.length !== 0) {
                calculatedResult.value = calculate(equation.value);
            }
        } else if (e.key === 'Delete' || e.key === 'Escape') {
            equation.value = [];
            displayEquation.value = [];
            calculatedResult.value = '';
        } else if (e.key === 'Backspace') {
            equation.value.pop();
            displayEquation.value.pop();
        } else if (e.key === '(' || e.key === ')') {
            equation.value.push(e.key);
            displayEquation.value.push(e.key);
        } else if (OPERATORS.includes(e.key)) {
            equation.value.push(e.key);
            displayEquation.value.push(` ${e.key} `);
        } else if (e.key === '%') {
            equation.value.push(e.key);
            displayEquation.value.push(e.key);
        } else if (e.key === ".") {
            equation.value.push(e.key);
            displayEquation.value.push(e.key);
        } else if (!isNaN(Number(e.key)) && e.key !== ' ') {
            equation.value.push(e.key);
            displayEquation.value.push(e.key);
        }
    });
}

onMounted(() => {
    listenForInput();

    if (props.equation && props.result !== null && props.result !== undefined) {
        equation.value = props.equation.split(',');
        displayEquation.value = props.equation.split(',');
        calculatedResult.value = props.result;
    }
});
</script>

<template>
    <div class="calculator-box">
        <OutputBox :equation="displayEquation" :latest-output="calculatedResult" type="standard"></OutputBox>
        <NumPad @button-click="handleButtonClick"></NumPad>
    </div>
</template>

<style scoped>
.calculator-box {
    width: 90vw;
    height: 100%;
    background-color: transparent;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;
    gap: 10px;
}
</style>