<script setup lang="ts">
import { onMounted, ref } from 'vue';

import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

import Calculator from '@calculite/shared/src/components/Calculator.vue';
import ScientificCalculator from '@calculite/shared/src/components/ScientificCalculator.vue';
import UnitConverter from '@calculite/shared/src/components/UnitConverter.vue';
import ModeSwitcher from '@calculite/shared/src/components/ModeSwitcher.vue';
import Settings from '@calculite/shared/src/components/Settings.vue';

import { getCalculatorMode, setCalculatorMode, type CalculatorType } from '@calculite/shared/src/utilities/calculator_utils';

const currentMode = ref<CalculatorType>();

function switchCalculator(mode: CalculatorType) {
	setCalculatorMode(mode);
	currentMode.value = mode;
}

onMounted(() => {
	window.addEventListener('popstate', (e) => {
		if (e.state && (e.state.mode as CalculatorType)) {
			currentMode.value = e.state.mode;
		} else {
			currentMode.value = 'standard';
		}
	});

	const fetchedMode = getCalculatorMode();

	currentMode.value = fetchedMode;

	window.history.replaceState({ mode: fetchedMode }, '', window.location.search);
});
</script>

<template>
	<div class="content-wrapper" v-if="currentMode">
		<ModeSwitcher :mode="currentMode" app-type="extension" @mode-change="switchCalculator"></ModeSwitcher>
		<Calculator class="calculator" v-if="currentMode === 'standard'"></Calculator>
		<ScientificCalculator class="calculator" v-else-if="currentMode === 'scientific'"></ScientificCalculator>
		<UnitConverter class="calculator unit-converter" v-else-if="currentMode === 'conversion'"></UnitConverter>
		<Settings class="calculator" v-else-if="currentMode === 'settings'"></Settings>
	</div>
</template>

<style scoped>
.content-wrapper {
	width: 100vw;
	height: 100svh;
	display: grid;
	grid-template-rows: 1fr 9fr;
	justify-content: center;
	box-sizing: border-box;
	padding: 20px;
}

.calculator {
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
	height: 100%;
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