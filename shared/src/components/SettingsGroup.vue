<script setup lang="ts">
import '@material/web/switch/switch.js';

import { vibrate } from '../utilities/vibrate';

const props = defineProps({
    'title': String,
    'description': String,
    'enabled': Boolean,
});

const emit = defineEmits(['toggle']);

function toggle() {
    vibrate([6]);

    const switchElement: any = document.getElementById('switch-el');

    console.log('Selected:', switchElement.selected);

    emit('toggle', !switchElement.selected);
}
</script>

<template>
    <div class="settings-group">
        <div class="left">
            <p class="title">{{ props.title }}</p>
            <p class="description">{{ props.description }}</p>
        </div>
        <md-switch icons :selected="props.enabled" id="switch-el" @click="toggle()"></md-switch>
    </div>
</template>

<style scoped>
.settings-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    border-radius: 25px;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    padding: 10px;
    box-sizing: border-box;
}

.title {
    font-size: 1.5em;
}

.description {
    font-size: 1em;
}

.left {
    text-align: left;
}
</style>