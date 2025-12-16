<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import ResourceChart from './components/ResourceChart.vue';
import StaticData from './components/StaticData.vue';
</script>

<template>
  <AppHeader/>
  <div>
    <div></div>
    <div class="mainStats">
      <StaticData/>
      <ResourceChart/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
