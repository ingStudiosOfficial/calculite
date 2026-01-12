<script setup lang="ts">
import NumberButton from './NumberButton.vue';

interface ButtonProps {
    value: string;
}

const props = defineProps<ButtonProps>();

const emit = defineEmits(['button-click']);

//function buttonClicked()
</script>

<template>
    <!--<NumberButton color="primary" :value="value.toString()" :display="value.toString()" type="scientific" @button-click=""></NumberButton>-->
</template>

<style scoped>

</style>