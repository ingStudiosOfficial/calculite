<script setup lang="ts">
import { ref } from 'vue';

import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

import Calculator from './components/Calculator.vue';
import ScientificCalculator from './components/ScientificCalculator.vue';
import UnitConverter from './components/UnitConverter.vue';
import ModeSwitcher from './components/ModeSwitcher.vue';

import { getCalculatorMode, setCalculatorMode } from './utilities/calculator_utils';

const currentMode = ref(getCalculatorMode());

function switchCalculator(mode: string) {
	setCalculatorMode(mode);
	currentMode.value = mode;
}
</script>

<template>
	<div class="content-wrapper">
		<ModeSwitcher @mode-change="switchCalculator"></ModeSwitcher>
		<Calculator class="calculator" v-if="currentMode === 'standard'"></Calculator>
		<ScientificCalculator class="calculator" v-else-if="currentMode === 'scientific'"></ScientificCalculator>
		<UnitConverter class="calculator unit-converter" v-else-if="currentMode === 'conversion'"></UnitConverter>
	</div>
</template>

<style scoped>
.content-wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 20px;
}

.calculator {
	flex: 1 1 auto;
	min-height: 0;
	transition: all var(--md-spring-expressive-effects-slow-duration) var(--md-spring-expressive-effects-slow);
	width: 90vw;
}

.unit-converter {
	display: flex;
	flex-direction: row;
	align-items: stretch;
    justify-content: center;
	padding: 0;
}

.mode-expand {
	width: 100vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
}
</style>