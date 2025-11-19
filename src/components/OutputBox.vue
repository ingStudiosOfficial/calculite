<script setup lang="ts">
import { type PropType } from 'vue';

import { type CalculatorType } from '@/utilities/calculator_utils';

const props = defineProps({
    equation: Array,
    latestOutput: Number,
    type: {
        type: String as PropType<CalculatorType>,
        required: true,
        validator: (value: string) => {
            return ["standard", "scientific"].includes(value);
        },
    },
});
</script>

<template>
    <div class="output-field">
        <p class="output" :class="type === 'standard' ? 'standard' : 'scientific'">{{ $props.latestOutput }}</p>
        <p class="equation" :class="type === 'standard' ? 'standard' : 'scientific'">{{ $props.equation?.join("") }}</p>
    </div>
</template>

<style scoped>
.output-field {
    border-radius: 25px;
    width: 100%;
    height: 100%;
    background-color: var(--md-sys-color-primary-container);
    text-align: right;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    word-break: break-all;
}

.output {
    color: var(--md-sys-color-on-primary-container);
    font-size: 2em;
    margin: 0;
}

.output.standard {
    font-size: 2em;
}

.output.scientific {
    font-size: 2em;
}

.equation {
    color: var(--md-sys-color-on-primary-container);
    font-size: 3em;
    margin: 0;
}

.equation.standard {
    font-size: 3em;
}

.equation.scientific {
    font-size: 3em;
}
</style>