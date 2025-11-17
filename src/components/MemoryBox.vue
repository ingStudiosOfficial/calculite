<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { saveResults, fetchResults, type ResultObject } from '@/utilities/calculator_utils';

const props = defineProps(['addResult']);

const resultsToDisplay = ref<string[]>([]);

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
        <p v-for="result in resultsToDisplay.slice(0, 10)" class="result-text">{{ result }}</p>
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
    align-items: center;
    text-align: left;
    box-sizing: border-box;
    padding: 20px;
    overflow-y: scroll;
    min-height: 100%;
    max-height: 100%;
}

.result-text {
    font-size: 2em;
    margin: 5px;
}
</style>