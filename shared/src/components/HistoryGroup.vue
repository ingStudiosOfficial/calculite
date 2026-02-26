<script setup lang="ts">
import { computed } from 'vue';
import '@material/web/divider/divider.js';

const props = defineProps({
    'equation': String,
    'result': Number,
    'note': String,
    'date': Number,
});

const formattedDate = computed(() => {
    if (!props.date) return '';
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(props.date));
});
</script>

<template>
    <div class="history-group">
        <div class="history-header">
            <p class="equation">{{ props.equation }} =</p>
            <p class="date">{{ formattedDate }}</p>
        </div>
        <div class="history-result">
            <p class="result">{{ props.result }}</p>
        </div>
        <md-divider v-if="props.note"></md-divider>
        <div v-if="props.note" class="history-note">
            <p class="note">{{ props.note }}</p>
        </div>
    </div>
</template>

<style scoped>
.history-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    border-radius: 25px;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    padding: 10px;
    box-sizing: border-box;
}

.result {
    font-size: 2em;
}

.equation, .note, .date {
    font-size: 1em;
}

.history-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.history-result, .history-note {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
}
</style>