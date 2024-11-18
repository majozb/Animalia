<template>
  <div class="donut-chart">
    <h3>{{ title }}</h3>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

// Registra todos los componentes de Chart.js
Chart.register(...registerables);

export default {
  name: "DonutChart",
  props: {
    chartId: {
      type: String,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: "Gráfico Donut",
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      }),
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      new Chart(document.getElementById(this.chartId), {
        type: "doughnut",
        data: this.chartData,
        options: this.options,
      });
    },
  },
};
</script>

<style scoped>
.donut-chart {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  text-align: center;
}
</style>
