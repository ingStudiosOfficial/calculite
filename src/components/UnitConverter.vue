<script setup lang="ts">
import convert from 'convert';

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
</script>

<template>
    <div class="content-wrapper">
        <div class="unit-container">
            <h1>From</h1>
            <div class="input-group">
                <md-outlined-text-field></md-outlined-text-field>
                <md-outlined-select class="unit-select">
                    <md-select-option>
                        <p slot="headline">Lol</p>
                    </md-select-option>
                </md-outlined-select>
            </div>
        </div>
        <div class="unit-container">
            <h1>To</h1>
            <div class="input-group">
                <md-outlined-text-field></md-outlined-text-field>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: 10px;
    flex-wrap: nowrap;
}

.input-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.unit-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    padding: 20px;
    box-sizing: border-box;
    border-radius: 25px;
    --md-outlined-text-field-container-shape: 25px;
    flex: 1;
}

.unit-select {
    width: 50px;
    --md-outlined-select-text-field-container-shape: 25px;
}
</style>