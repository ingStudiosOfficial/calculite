<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

import { saveResults, fetchResults, type ResultObject, fetchPinnedResults, type ResultItem, pinResult, unpinResult } from '@/utilities/calculator_utils';

import MemoryContextMenu from './MemoryContextMenu.vue';

const props = defineProps(['addResult']);

const emit = defineEmits(['emitResult']);

interface ContextMenuParams {
    display: boolean;
    x: number;
    y: number;
    content: string[];
    resultItem: ResultItem;
}

const resultsToDisplay = ref<string[]>([]);
const pinnedResults = ref<string[]>([]);
const contextMenuParams = ref<ContextMenuParams>({
    display: false,
    x: 0,
    y: 0,
    content: [],
    resultItem: {
        value: '',
        index: 0,
        pinned: false,
    },
});

function addResultToEquation(result: string) {
    if (navigator.vibrate) {
        navigator.vibrate([10]);
    }
    
    emit('emitResult', result);
}

function openMenu(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;

    contextMenuParams.value.x = e.clientX;
    contextMenuParams.value.y = e.clientY;
    contextMenuParams.value.resultItem.index = Number(target.dataset.index) || 0;
    contextMenuParams.value.resultItem.value = target.dataset.result || '';
    const pinnedStr = target.dataset.pinned || 'false';
    contextMenuParams.value.resultItem.pinned = pinnedStr === 'true';
    contextMenuParams.value.content = [
        contextMenuParams.value.resultItem.pinned ? 'Unpin' : 'Pin',
        'Delete',
    ];
    contextMenuParams.value.display = true;
}

function refreshResults() {
    resultsToDisplay.value = fetchResults();
    pinnedResults.value = fetchPinnedResults();
}

function pinOrUnpin(pinned: boolean, result: string, index?: number) {
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    if (pinned === true) {
        if (index === undefined) return;
        unpinResult(result, index);
    } else {
        pinResult(result)
    }

    resultsToDisplay.value = fetchResults();
    pinnedResults.value = fetchPinnedResults();
}

watch(() => props.addResult, (newValue: ResultObject, oldValue: ResultObject) => {
    console.log(newValue.value);
    if (Number.isNaN(parseFloat(newValue.value as string))) { 
        console.warn("Attempted to add a NaN result, returning.");
        return;
    }
    console.log(`Adding ${newValue.value} to the results, old value ${oldValue.value}.`);
    resultsToDisplay.value.unshift(newValue.value);
    saveResults(resultsToDisplay.value);
});

onMounted(() => {
    resultsToDisplay.value = fetchResults();
    pinnedResults.value = fetchPinnedResults();
});
</script>

<template>
    <div class="content-wrapper">
        <button v-for="(result, index) in pinnedResults" class="result-div pinned-result" :data-result="result" :data-pinned="true" :data-index="index" @click="addResultToEquation(result)" @contextmenu.prevent="openMenu($event)">
            <md-filled-tonal-icon-button class="pin-button" @click.stop="pinOrUnpin(true, result, index)">
                <md-icon>keep_off</md-icon>
            </md-filled-tonal-icon-button>
            <md-ripple></md-ripple>
            <md-focus-ring style="--md-focus-ring-shape: 25px;"></md-focus-ring>
            <p class="result-text">{{ result }}</p>
        </button>
        <button v-for="(result, index) in resultsToDisplay.slice(0, (10 - pinnedResults.length))" class="result-div" :data-result="result" :data-pinned="false" :data-index="index" @click="addResultToEquation(result)" @contextmenu.prevent="openMenu($event)">
            <md-icon-button class="pin-button" @click.stop="pinOrUnpin(false, result)">
                <md-icon>keep</md-icon>
            </md-icon-button>
            <md-ripple></md-ripple>
            <md-focus-ring style="--md-focus-ring-shape: 25px;"></md-focus-ring>
            <p class="result-text">{{ result }}</p>
        </button>
    </div>
    <MemoryContextMenu :x="contextMenuParams.x" :y="contextMenuParams.y" :content="contextMenuParams.content" :res-item="contextMenuParams.resultItem" @close="contextMenuParams.display = false" @refresh="refreshResults()"></MemoryContextMenu>
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
    gap: 10px;
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
    user-select: none;
}

.pinned-result {
    border: var(--md-sys-color-outline) 2px solid;
}

.pin-button {
    position: absolute;
    top: -10px;
    right: -10px;
    
}
</style>