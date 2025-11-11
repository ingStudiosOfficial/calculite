<script setup lang="ts">
import { number } from 'mathjs';

const prop = defineProps({
    'equation': Array,
    'latestOutput': Number,
});
</script>

<template>
    <div class="output-field">
        <p class="output">{{ $props.latestOutput }}</p>
        <p class="equation">{{ $props.equation?.join("") }}</p>
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
    color: var(--md-sys-color-outline);
    font-size: 2em;
    margin: 0;
}

.equation {
    color: var(--md-sys-color-on-primary-container);
    font-size: 3em;
    margin: 0;
}
</style>