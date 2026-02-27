<script setup lang="ts">
import { type PropType, ref, watch } from 'vue';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';
import '@material/web/dialog/dialog.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/filled-tonal-button.js';

import { type HistoryObject, saveToHistory, type CalculatorType } from '../utilities/calculator_utils';

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
const dialogVisible = ref<boolean>(false);
const currentHistoryObject = ref<HistoryObject>({
    equation: '',
    result: 0,
    note: '',
    date: Date.now(),
});
const saveDialog = ref<HTMLDialogElement>();

function closeDialog() {
    saveDialog.value?.close();
}

function onDialogClose() {
    dialogVisible.value = false;
}

function saveHistoryObject() {
    if (!currentHistoryObject.value || !props.equation) return;

    currentHistoryObject.value.equation = props.equation.join('');
    currentHistoryObject.value.result = Number(resultToDisplay.value);
    currentHistoryObject.value.date = Date.now();

    saveToHistory(currentHistoryObject.value);

    currentHistoryObject.value = {
        equation: '',
        result: 0,
        note: '',
        date: Date.now(),
    }

    closeDialog();
}

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

            break;
    }
});
</script>

<template>
    <div class="output-field">
        <md-icon-button v-if="resultToDisplay && typeof props.latestOutput === 'number'" class="add-button" @click="dialogVisible = true">
            <md-icon>library_add</md-icon>
        </md-icon-button>
        <md-dialog ref="saveDialog" :open="dialogVisible" @closed="onDialogClose()">
            <div slot="headline">Add to history</div>
            <div slot="content" class="dialog-content">
                <p class="save-equation">{{ props.equation?.join('') }} = {{ resultToDisplay }}</p>
                <md-outlined-text-field v-model="currentHistoryObject.note" class="note-field" label="Add a note" @keydown.enter="saveHistoryObject()"></md-outlined-text-field>
            </div>
            <div slot="actions">
                <md-filled-tonal-button @click="closeDialog()">Cancel</md-filled-tonal-button>
                <md-filled-button @click="saveHistoryObject()">Save</md-filled-button>
            </div>
        </md-dialog>
        <p class="output" :class="type === 'standard' ? 'standard' : 'scientific'">{{ resultToDisplay }}</p>
        <p class="equation" :class="type === 'standard' ? 'standard' : 'scientific'">{{ $props.equation?.join('') }}</p>
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
    position: relative;
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

.add-button {
    position: absolute;
    top: 10px;
    left: 10px;
}

.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 0;
}

.save-equation {
    font-size: 1.5rem;
}
</style>