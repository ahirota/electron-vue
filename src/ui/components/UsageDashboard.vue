<script setup lang="ts">
import StaticDataToggle from './StaticDataToggle.vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, Filler);

// Data Listeners
const dataListener = ref<UnsubscribeFunction | null>(null);
const viewListener = ref<UnsubscribeFunction | null>(null);

// Chart 
const activeView = ref<String>("CPU")
const dataPointCount: number = 10;
const chartStatisticsData = ref<Statistics[]>([]);
const tickFormatter = (value: number | string): string => {return (Math.round(Number(value) * 100) / 100).toString() + '%'};
const chartData = ref({
  labels: [5,4.5,4,3.5,3,2.5,2,1.5,1,0.5],
  datasets: [
      {
          label: 'CPU',
          data: [] as number[],
          fill: false,
          pointStyle: false as const,
          borderColor: '#5ef7ff',
          backgroundColor: '#5ef7ff',
          borderWidth: 1,
          borderJoinStyle: 'round' as const,
          tension: 0.1,
          hidden: false
      },
      {
          label: 'RAM',
          data: [] as number[],
          fill: false,
          pointStyle: false as const,
          borderColor: '#5ef7ff',
          backgroundColor: '#5ef7ff',
          borderWidth: 1,
          borderJoinStyle: 'round' as const,
          tension: 0.1,
          hidden: true
      },
      {
          label: 'Storage',
          data: [] as number[],
          fill: false,
          pointStyle: false as const,
          borderColor: '#5ef7ff',
          backgroundColor: '#5ef7ff',
          borderWidth: 1,
          borderJoinStyle: 'round' as const,
          tension: 0.1,
          hidden: true
      },
  ]
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 2 | 1,
  scales: {
    x: {
      grid: {
        display: false
      },
      border: {
        color: '#a63734',
      },
      ticks: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      },
      border: {
        color: '#a63734',
      },
      ticks: {
        color: '#a63734',
        display: true,
        callback: tickFormatter,
        font: {
          family: 'Orbitron'
        }
      },
      suggestedMin: 0
    }
  },
  plugins: {
    filler: {
      propagate: true
    },
    tooltip: {
      enabled: false
    },
    legend: {
      display: false
    }
  }
});

// Static Data Refs
const totalStorage = ref<number>();
const cpuModel = ref<string>();
const totalMemoryGB = ref<number>();

// Toggle Active View Manually
const toggleView = (view: View): void => {
  activeView.value = view;
};

// Watch the stats ref and update the chart data
watch(chartStatisticsData, (newVal) => {
  const cpu = newVal.map((s: Statistics) => s.cpuUsage * 100);
  const ram = newVal.map((s: Statistics) => s.ramUsage * 100);
  const storage = newVal.map((s: Statistics) => s.storageUsage * 100);

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

watch(activeView, (newVal) => {
  const cpuView = newVal != 'CPU';
  const ramView = newVal != 'RAM';
  const storageView = newVal != 'STORAGE';

  // Replace the entire data object to trigger vue-chartjs reactivity
  chartData.value = {
    labels: chartData.value.labels,
    datasets: [
      { ...chartData.value.datasets[0], hidden: cpuView } as any,
      { ...chartData.value.datasets[1], hidden: ramView } as any,
      { ...chartData.value.datasets[2], hidden: storageView } as any,
    ]
  };
}, { deep: true });

// On Mount, Fetch All Data
onMounted(async () => {
  dataListener.value = window.electron.subscribeStatistics((stats) => {
    // mutate the ref in-place so Vue reactivity remains intact
    chartStatisticsData.value.push(stats);
    if (chartStatisticsData.value.length > dataPointCount) {
      chartStatisticsData.value.shift();
    }
  });

  viewListener.value = window.electron.subscribeChangeView((view) => {
    activeView.value = view;
  });

  const staticData = await window.electron.getStaticData();
  totalStorage.value = staticData.totalStorage;
  cpuModel.value = staticData.cpuModel;
  totalMemoryGB.value = staticData.totalMemoryGB;
});

onBeforeUnmount(() => {
  if (dataListener.value) {
    dataListener.value();
  }
  if (viewListener.value) {
    viewListener.value();
  }
});
</script>

<template>
    <div class="max-w-3xl mx-auto p-3">
        <div id="dataToggles" class="grid grid-cols-3 justify-between gap-1">
            <StaticDataToggle @toggle="toggleView" title="CPU" :subtitle="cpuModel" :current-usage="chartStatisticsData.map((s: Statistics) => s.cpuUsage * 100)" :is-active="activeView == 'CPU'" />
            <StaticDataToggle @toggle="toggleView" title="RAM" :subtitle="totalMemoryGB" :current-usage="chartStatisticsData.map((s: Statistics) => s.ramUsage * 100)" :is-active="activeView == 'RAM'" />
            <StaticDataToggle @toggle="toggleView" title="STORAGE" :subtitle="totalStorage" :current-usage="chartStatisticsData.map((s: Statistics) => s.storageUsage * 100)" :is-active="activeView == 'STORAGE'" />
        </div>
        <div id="usageGraph" class="mt-5 px-3 pb-3">
            <Line :data="chartData" :options="chartOptions"></Line>
        </div>
    </div>
</template>
