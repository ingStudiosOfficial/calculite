<script setup lang="ts">

</script>

<template>
<div class="footer-wrapper">
    <a class="footer-link" href="https://github.com/ingStudiosOfficial/calculite" target="blank">GitHub</a>
    <a class="footer-link" href="https://github.com/ingStudiosOfficial/calculite/releases/latest" target="blank">Releases</a>
</div>
</template>

<style scoped>
.footer-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 25px;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
}

.footer-link {
    text-decoration: none;
}
</style>