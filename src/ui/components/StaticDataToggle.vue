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
.clip-corner-wrapper {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
}

.clip-corner {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
}
</style>

<template>
    <div class="grid p-px bg-[#2c101a] clip-corner-wrapper" :class="isActive ? 'bg-[#942e2a]' : ''">
        <div @click="$emit('toggle', title)" class="flex flex-col bg-[#13111e] py-1 px-2 justify-between clip-corner">
            <div class="flex flex-col">
                <p class="text-xs">{{ title }}</p>
                <p class="text-base">{{ formattedSubtitle }}</p>
            </div>
            <div class="flex flex-row justify-between mt-3">
                <p class="text-xl">USAGE:</p>
                <p class="text-xl mr-3">{{ lastUsage }}</p>
            </div>
        </div>
    </div>
</template>