<script setup lang="ts">
import { watch, ref } from 'vue';

import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

import { deleteResult, pinResult, unpinResult, type ResultItem } from '@/utilities/calculator_utils';
import { vibrate } from '@/utilities/vibrate';

const props = defineProps<{
    x: number;
    y: number;
    content: string[];
    resItem: ResultItem;
}>();

const emit = defineEmits(['close', 'refresh']);

const menu = ref<any>(null);
const anchor = ref<HTMLElement | null>(null);

function openMenu() {
    if (!anchor.value || !menu.value) return;

    anchor.value.style.left = props.x + 'px';
    anchor.value.style.top = props.y + 'px';

    menu.value.open = true;
    menu.value.reposition();
}

function onClosed() {
    emit('close');
}

function doAction(actionName: string) {
    console.log("Value:", props.resItem.value);

    vibrate([10]);

    switch (actionName.toLowerCase()) {
        case 'pin':
            pinResult(props.resItem.value);
            break;
        case 'unpin':
            unpinResult(props.resItem.value, props.resItem.index);
            break;
        case 'delete':
            deleteResult(props.resItem.index, props.resItem.pinned);
            break
        default:
            console.error('Could not find case for:', actionName);
            break;
    }

    menu.value.close();
    emit("refresh");
}

watch(() => [props.x, props.y], ([newX, newY]) => {
    if (newX !== 0 || newY !== 0) openMenu();
});
</script>

<template>
    <div
        ref="anchor"
        style="position: fixed; width:0; height:0;"
    ></div>

    <md-menu
        ref="menu"
        positioning="popover"
        :anchorElement="anchor"
        @closed="onClosed"
    >
        <md-menu-item v-for="item in content" @click="doAction(item)">
            <div slot="headline">{{ item }}</div>
        </md-menu-item>
    </md-menu>
</template>

<style scoped>

</style>