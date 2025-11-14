<script setup lang="ts">
import { ref } from 'vue';

import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

import Calculator from './components/Calculator.vue';
import ModeSwitcher from './components/ModeSwitcher.vue';
import ScientificCalculator from './components/ScientificCalculator.vue';

import { getCalculatorMode, setCalculatorMode } from './utilities/calculator_utils';

const modesOpened = ref(false);
const currentMode = ref(getCalculatorMode());

function toggleModes() {
	if (navigator.vibrate) {
		navigator.vibrate([10]);
	}

	modesOpened.value = !modesOpened.value;
}

function switchCalculator(mode: string) {
	setCalculatorMode(mode);
	currentMode.value = mode;
	modesOpened.value = false;
}
</script>

<template>
	<div class="content-wrapper">
		<div class="mode-expand">
			<md-icon-button @click="toggleModes()">
				<md-icon>
					expand_all
				</md-icon>
			</md-icon-button>
		</div>
		<Transition name="mode-switcher">
			<ModeSwitcher v-show="modesOpened" @mode-change="switchCalculator"></ModeSwitcher>
		</Transition>
		<Calculator class="calculator" v-if="currentMode === 'standard'"></Calculator>
		<ScientificCalculator v-else-if="currentMode === 'scientific'"></ScientificCalculator>
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
	transition: all 0.3s ease;
}

.mode-expand {
	width: 100vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
}

.mode-switcher-enter-active,
.mode-switcher-leave-active {
	transition: all var(--md-spring-standard-effects-fast-duration) var(--md-spring-standard-effects-fast);
	overflow: hidden;
}

.mode-switcher-enter-from,
.mode-switcher-leave-to {
	opacity: 0;
	max-height: 0;
	margin: 0;
}

.mode-switcher-enter-to,
.mode-switcher-leave-from {
	opacity: 1;
	max-height: 500px;
}
</style>