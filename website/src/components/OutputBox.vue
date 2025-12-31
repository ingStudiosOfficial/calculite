<script setup lang="ts">
import { type PropType, ref, watch } from 'vue';

import type { CalculatorType } from '@/utilities/calculator_utils';

const props = defineProps({
    equation: Array,
    latestOutput: {
        type: [Number, String],
        required: true,
    },
    type: {
        type: String as PropType<CalculatorType>,
        required: true,
        validator: (value: string) => {
            return ["standard", "scientific"].includes(value);
        },
    },
});

const resultToDisplay = ref<string>(props.latestOutput?.toString() || '');

watch(() => props.latestOutput, (newValue: number | string) => {
    switch (newValue) {
        case 67:
            resultToDisplay.value = "six seven";
            break;
        default:
            const isNumeric = typeof newValue === 'number' || 
                     (typeof newValue === 'string' && newValue.trim() !== "" && !isNaN(Number(newValue)));

            if (isNumeric) {
                console.log('Result is a number.');
                resultToDisplay.value = parseFloat((newValue as number).toFixed(10)).toString();
                return;
            }

            resultToDisplay.value = newValue.toString();
    }
});
</script>

<template>
    <div class="output-field">
        <p class="output" :class="type === 'standard' ? 'standard' : 'scientific'">{{ resultToDisplay }}</p>
        <p class="equation" :class="type === 'standard' ? 'standard' : 'scientific'">{{ $props.equation?.join("") }}</p>
    </div>
</template>

<style scoped>
.output-field {
    border-radius: 25px;
    width: 100%;
    height: 100%;
    background-color: var(--md-sys-color-primary-container);
    padding: 20px;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end; 
    text-align: right;
}

.output,
.equation {
    color: var(--md-sys-color-on-primary-container);
    margin: 0;
    white-space: nowrap;
    direction: ltr; 
}

.output {
    font-size: 2em;
    min-height: 1.2em;
}

.equation {
    font-size: 3em;
    min-height: 1.2em;
}
</style>