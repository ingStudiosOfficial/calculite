<script setup lang="ts">
import Calculator from './components/Calculator.vue';
</script>

<template>
	<div class="content-wrapper">
		<Calculator></Calculator>
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