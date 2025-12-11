<script lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, Filler);

export default {
  name: 'ResourceChart',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Data One',
                data: [40, 39, 10, 40, 39, 80, 88],
                fill:  "origin",
                tension: 0.1
            },
            {
                label: 'Data Two',
                data: [22, 69, 88, 10, 20, 45, 11],
                fill: false,
                tension: 0.1
            },
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
    <div>
        <Line :data="chartData" :options="chartOptions"></Line>
    </div>
</template>