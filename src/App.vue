<script setup lang="ts">
import { ref } from 'vue';

import Calculator from './components/Calculator.vue';
import AlertDialog from './components/AlertDialog.vue';

function isChromium(): boolean {
	const userAgent = navigator.userAgent;
	return userAgent.includes('Chrome') || userAgent.includes('Chromium');
}
</script>

<template>
	<div class="content-wrapper">
		<AlertDialog v-if="!isChromium()"></AlertDialog>
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