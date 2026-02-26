<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHistory, type HistoryObject } from '../utilities/calculator_utils';
import HistoryGroup from './HistoryGroup.vue';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/icon/icon.js';
import { computed } from 'vue';

const history = ref<HistoryObject[]>([]);
const searched = ref<string>('');

const shownHistory = computed(() => {
    if (!searched.value) return history.value;
    
    const term = searched.value.toLowerCase();
    return history.value.filter(h => {
        return Object.values(h).some(val => 
            String(val).toLowerCase().includes(term)
        );
    });
});

onMounted(() => {
    history.value = getHistory();
});
</script>

<template>
    <div class="history-page-wrapper">
        <h1 class="history-header">History</h1>
        <md-outlined-text-field v-model="searched" class="history-search" label="Search calculation history">
            <md-icon slot="leading-icon">search</md-icon>
        </md-outlined-text-field>
        <div class="history-wrapper">
            <HistoryGroup v-for="item in shownHistory" :key="item.date" :equation="item.equation" :result="item.result" :note="item.note" :date="item.date"></HistoryGroup>
        </div>
    </div>
</template>

<style scoped>
.history-page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90vw;
    height: 100%;
    background-color: transparent;
}

.history-header {
    color: var(--md-sys-color-primary);
}

.history-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    width: 30vw;
}

.footer {
    width: 30vw;
    position: fixed;
    bottom: 25px;
    left: 50vw;
    transform: translate(-50%, -50%);
}

.history-search {
    height: fit-content;
    margin: 10px 0;
}

@media (max-width: 768px) {
    .history-wrapper {
        width: 70vw;
    }

    .footer {
        width: 70vw;
    }
}
</style>