<script setup lang="ts">
import { ref } from 'vue';

import Calculator from './components/Calculator.vue';
import ChromeWarning from './components/ChromeWarning.vue';

function isChromium(): boolean {
	const userAgent = navigator.userAgent;
	return userAgent.includes('Chrome') || userAgent.includes('Chromium');
}
</script>

<template>
	<div class="content-wrapper">
		<ChromeWarning v-if="!isChromium()"></ChromeWarning>
		<Calculator v-else></Calculator>
	</div>
</template>

<style scoped>
.content-wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>