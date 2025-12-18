<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string
  subtitle?: string | number
  currentUsage?: number[]
  isActive: boolean
}>()

const percentageFormatter = (value: number | string): string => {return (Math.round(Number(value) * 100) / 100).toFixed(2).toString() + '%'};

const lastUsage = computed(() => {
    if (props.currentUsage != undefined) {
        const lastValue = props.currentUsage[(props.currentUsage.length - 1)];
        if (lastValue == 0) {
            const firstVal = props.currentUsage.find(value => value != 0);
            if (firstVal) {
                return percentageFormatter(firstVal);
            }
            return '0.00%'
        }
        if (lastValue !== undefined) {
            return percentageFormatter(lastValue);
        }
    }
});

const formattedSubtitle = computed(() => {
    switch(props.title) {
        case('CPU'): {
            return props.subtitle;
        }
        case('RAM'): {
            return props.subtitle?.toString() + ' GB Memory';
        }
        case('STORAGE'): {
            return props.subtitle?.toString() + ' GB Storage';
        }
        default:
            return '';
    }
});
</script>

<style scoped>
    
</style>

<template>
    <div @click="$emit('toggle', title)" class="flex flex-col border-2 border-white rounded-md p-1" :class="isActive ? 'active' : ''">
        <div class="flex flex-row">
            <p>{{ title }}</p>
            <p>{{ formattedSubtitle }}</p>
        </div>
        <div class="flex flex-row">
            <p>Utilization Percentage</p>
            <p>{{ lastUsage }}</p>
        </div>
    </div>
</template>