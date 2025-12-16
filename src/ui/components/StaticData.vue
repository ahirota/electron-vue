<script setup lang="ts">
import { ref, onMounted } from 'vue';

const totalStorage = ref<number>();
const cpuModel = ref<String>();
const totalMemoryGB = ref<number>();

onMounted(async () => {
    const staticData = await window.electron.getStaticData();
    totalStorage.value = staticData.totalStorage;
    cpuModel.value = staticData.cpuModel;
    totalMemoryGB.value = staticData.totalMemoryGB;
});

</script>

<style scoped>
    
</style>

<template>
    <div>
        <div>Some Sort of Title</div>
        <div>CPU <div>{{ cpuModel }}</div></div>
        <div>Storage Block<div>{{ totalStorage }}</div></div>
        <div>Memory Block<div>{{ totalMemoryGB }}</div></div>
    </div>
</template>