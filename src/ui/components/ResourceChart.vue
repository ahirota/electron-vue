<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, Filler);

const dataPointCount: number = 10;
const dataListener = ref<UnsubscribeFunction | null>(null);

// Use a ref for the array so we can mutate it (push/shift) and keep reactivity
const chartStatisticsData = ref<Statistics[]>([]);

const tickFormatter = (value: number | string): string => {return value.toString() + '%'};

const chartData = ref({
  labels: [5,4.5,4,3.5,3,2.5,2,1.5,1,0.5],
  datasets: [
      {
          label: 'CPU',
          data: [] as number[],
          fill: false,
          pointStyle: false as const,
          borderColor: '#36a2eb',
          backgroundColor: '#36a2eb',
          borderWidth: 3,
          borderJoinStyle: 'round' as const,
          tension: 0.1
      },
      {
          label: 'RAM',
          data: [] as number[],
          fill: false,
          pointStyle: false as const,
          borderColor: '#ff6384',
          backgroundColor: '#ff6384',
          borderWidth: 3,
          borderJoinStyle: 'round' as const,
          tension: 0.1
      },
      {
          label: 'Storage',
          data: [] as number[],
          fill: false,
          pointStyle: false as const,
          borderColor: '#ffcd56',
          backgroundColor: '#ffcd56',
          borderWidth: 3,
          borderJoinStyle: 'round' as const,
          tension: 0.1
      },
  ]
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      },
      ticks: {
        display: true,
        callback: tickFormatter
      }
    }
  },
  plugins: {
    filler: {
      propagate: true
    },
    tooltip: {
      enabled: false
    }
  }
});

// Watch the stats ref and update the chart data
watch(chartStatisticsData, (newVal) => {
  const cpu = [...newVal.map(s => s.cpuUsage * 100), ...Array.from({ length: dataPointCount - newVal.length})];
  const ram = [...newVal.map(s => s.ramUsage * 100), ...Array.from({ length: dataPointCount - newVal.length})];
  const storage = [...newVal.map(s => s.storageUsage * 100), ...Array.from({ length: dataPointCount - newVal.length})];

  // Replace the entire data object to trigger vue-chartjs reactivity
  chartData.value = {
    labels: chartData.value.labels,
    datasets: [
      { ...chartData.value.datasets[0], data: cpu } as any,
      { ...chartData.value.datasets[1], data: ram } as any,
      { ...chartData.value.datasets[2], data: storage } as any,
    ]
  };
}, { deep: true });

onMounted(() => {
  dataListener.value = window.electron.subscribeStatistics((stats) => {
    // mutate the ref in-place so Vue reactivity remains intact
    chartStatisticsData.value.push(stats);
    if (chartStatisticsData.value.length > dataPointCount) {
      chartStatisticsData.value.shift();
    }
  });
});

onBeforeUnmount(() => {
  if (dataListener.value) {
    dataListener.value();
  }
});

</script>

<style scoped>
</style>

<template>
    <div>
        <Line :data="chartData" :options="chartOptions"></Line>
    </div>
</template>