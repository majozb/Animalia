<template>
  <v-card class="widget-card">
    <v-card-title>
      <v-icon :style="{ color: Color }" class="widget-icon">{{ icon }}</v-icon>
      <span class="widget-title">{{ title }}</span>
    </v-card-title>
    <v-card-subtitle class="widget-price">{{ price }}</v-card-subtitle>
    <v-card-text>
      <canvas :id="chartId" class="widget-chart"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { v4 as uuidv4 } from 'uuid';

// Registra todos los componentes de Chart.js
Chart.register(...registerables);

export default {
  name: 'WidgetGraph',
  props: {
    icon: {
      type: String,
      required: true
    },
    Color: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartId = uuidv4(); // Generar un ID único para el canvas

    onMounted(() => {
      const ctx = document.getElementById(chartId);
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: props.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false // Ocultar la leyenda
              }
            },
            scales: {
              x: {
                display: false 
              },
              y: {
                display: false 
              }
            },
            elements: {
              point: {
                radius: 0 
              }
            }
          }
        });
      } else {
        console.error('Failed to get canvas element by ID');
      }
    });

    return { chartId };
  }
};
</script>

<style scoped>
.widget-card {
  width: 300px;
  margin-top: 16px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.widget-icon {
  font-size: 36px;
  margin-right: 8px;
}

.widget-title {
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
  color:black
}

.widget-price {
  font-size: 24px;
  font-weight: 700;
  color: black;
}

.widget-chart {
  /* width: 400px;
  height: 100px; */
  margin-top: 16px;
}
</style>
