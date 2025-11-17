<script setup lang="ts">
import { onMounted, ref } from 'vue';

import NumPadSci from './NumPadSci.vue';
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
    "BACKSPACE",
    "PARENTHESES",
    "PI",
    "EULER",
];

const FUNCTIONS = [
    {
        value: "PRT",
        display: "prt",
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
        value: "LOG",
        display: "log",
        color: "secondary",
    },
    {
        value: "MOD",
        display: "mod",
        color: "secondary",
    },
]

// Operators
const OPERATORS: string[] = [
    "/",
    "*",
    "-",
    "+",
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

    // Check for keywords
    if (KEYWORDS.includes(buttonClickedObject)) {
        switch (buttonClickedObject) {
            case "CLEAR_ALL":
                equation.value = [];
                displayEquation.value = [];
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
            case "PI":
                equation.value.push("3.14159265359");
                displayEquation.value.push("π");
                break;
            case "EULER":
                equation.value.push("2.71828");
                displayEquation.value.push("𝑒");
                break;
            default:
                console.log('Unexpected keyword:', buttonClickedObject);
        }

        return;
    }

    if (FUNCTIONS.map(func => func.value).includes(buttonClickedObject)) {
        equation.value.push(props.value);
        displayEquation.value.push(props.display);
        equation.value.push("(");
        displayEquation.value.push("(");
        return;
    }

    // Push the value to the array in each equation
    equation.value.push(props.value);
    displayEquation.value.push(props.display);
}

function listenForInput() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (equation.value.length !== 0) {
                calculatedResult.value = calculate(equation.value);
            }
        } else if (e.key === 'Delete' || e.key === 'Escape') {
            equation.value = [];
            displayEquation.value = [];
        } else if (e.key === 'Backspace') {
            equation.value.pop();
            displayEquation.value.pop();
        } else if (e.key === '(' || e.key === ')') {
            equation.value.push(e.key);
            displayEquation.value.push(e.key);
        } else if (OPERATORS.includes(e.key)) {
            equation.value.push(e.key);
            displayEquation.value.push(` ${e.key} `);
        } else if (e.key === ',') {
            equation.value.push(e.key);
            displayEquation.value.push(`${e.key} `);
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
});
</script>

<template>
    <div class="calculator-box">
        <OutputBox :equation="displayEquation" :latest-output="calculatedResult" type="scientific"></OutputBox>
        <NumPadSci @button-click="handleButtonClick"></NumPadSci>
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