<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import ResourceChart from './components/ResourceChart.vue';
import StaticData from './components/StaticData.vue';
</script>

<template>
  <AppHeader/>
  <StaticData/>
  <ResourceChart/>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
