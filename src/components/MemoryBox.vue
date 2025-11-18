<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';

import { saveResults, fetchResults, type ResultObject } from '@/utilities/calculator_utils';

const props = defineProps(['addResult']);

const emit = defineEmits(['emitResult']);

const resultsToDisplay = ref<string[]>([]);

function addResultToEquation(result: string) {
    if (navigator.vibrate) {
        navigator.vibrate([10]);
    }
    
    emit('emitResult', result);
}

watch(() => props.addResult, (newValue: ResultObject, oldValue: ResultObject) => {
    console.log(`Adding ${newValue} to the results, old value ${oldValue}.`);
    resultsToDisplay.value.unshift(newValue.value);
    saveResults(resultsToDisplay.value);
});

onMounted(() => {
    resultsToDisplay.value = fetchResults();
});
</script>

<template>
    <div class="content-wrapper">
        <button v-for="result in resultsToDisplay.slice(0, 10)" class="result-div" @click="addResultToEquation(result)">
            <md-ripple></md-ripple>
            <md-focus-ring style="--md-focus-ring-shape: 25px;"></md-focus-ring>
            <p class="result-text">{{ result }}</p>
        </button>
    </div>
</template>

<style scoped>
.content-wrapper {
    width: 100%;
    height: 100%;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    box-sizing: border-box;
    padding: 20px;
    overflow-y: scroll;
    min-height: 100%;
    max-height: 100%;
}

.result-div {
    all: unset;
    position: relative;
    width: 100%;
    height: fit-content;
    border-radius: 25px;
    padding: 10px;
    box-sizing: border-box;
}

.result-text {
    font-size: 2em;
    margin: 5px;
}
</style>