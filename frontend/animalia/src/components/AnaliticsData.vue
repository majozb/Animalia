<template>
  <div>
    <h1>Analíticas</h1>

    <!-- Sección Doughnut -->
    <section>
      <h2>Gráficas de Tipo Doughnut</h2>
      <canvas id="productsByCategoryChart"></canvas>
      <canvas id="adoptionsByAnimalTypeChart"></canvas>
    </section>

    <!-- Sección Bar -->
    <section>
      <h2>Gráficas de Ventas y Adopciones (Bar)</h2>
      <canvas id="monthlySalesChart"></canvas>
      <canvas id="monthlyAdoptionsChart"></canvas>
    </section>

    <!-- Sección Line -->
    <section>
      <h2>Gráficas de Tipo Línea</h2>
      <canvas id="salesTrendChart"></canvas>
      <canvas id="adoptionsTrendChart"></canvas>
      <!-- Nueva gráfica para Total Sales -->
      <h2>Total Sales</h2>
      <canvas id="totalSalesChart"></canvas>
    </section>
    
    <v-container>
    <v-card class="pa-4">
      <v-row justify="space-between" align="center">
        <v-col>
          <h2 class="text-h6 font-weight-bold">Top Clients</h2>
        </v-col>
        <v-col class="text-right">
          <v-btn text>View All</v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(client, index) in topClients"
          :key="index"
          class="d-flex align-center justify-space-between"
        >
          <!-- Cliente Info -->
          <v-list-item-avatar>
            <v-img :src="client.image" alt="client name"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ client.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ client.points }} Points</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider v-if="index < topClients.length - 1"></v-divider>
      </v-list>
    </v-card>
  </v-container>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';


// Registra todos los componentes de Chart.js
Chart.register(...registerables);

export default {
  name: 'AnaliticsData',
  data() {
    return {
      topClients: [
        {
          name: "John Doe",
          points: 100,
          couponCode: "Sflat",
          discount: -15,
          price: "$27.00",
          image: "https://via.placeholder.com/40",
          countryFlag: "https://flagcdn.com/w320/es.png", // España
        },
        {
          name: "Jane Smith",
          points: 95,
          couponCode: "Sflat",
          discount: -15,
          price: "$27.00",
          image: "https://via.placeholder.com/40",
          countryFlag: "https://flagcdn.com/w320/in.png", // India
        },
        {
          name: "Alice Johnson",
          points: 90,
          couponCode: "Sflat",
          discount: -15,
          price: "$27.00",
          image: "https://via.placeholder.com/40",
          countryFlag: "https://flagcdn.com/w320/gb.png", // Reino Unido
        },
        {
          name: "Chris Lee",
          points: 85,
          couponCode: "Sflat",
          discount: -15,
          price: "$27.00",
          image: "https://via.placeholder.com/40",
          countryFlag: "https://flagcdn.com/w320/br.png", // Brasil
        },
        {
          name: "Maria Gonzalez",
          points: 80,
          couponCode: "Sflat",
          discount: -15,
          price: "$27.00",
          image: "https://via.placeholder.com/40",
          countryFlag: "https://flagcdn.com/w320/fr.png", // Francia
        },
      ],
    }
  },
  setup() {
    onMounted(() => {
      // Doughnut Chart - Products by Category
      new Chart(document.getElementById('productsByCategoryChart'), {
        type: 'doughnut',
        data: {
          labels: ['Alimentos', 'Juguetes', 'Accesorios'],
          datasets: [
            {
              data: [300, 150, 200],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          }
        }
      });

      // Doughnut Chart - Adoptions by Animal Type
      new Chart(document.getElementById('adoptionsByAnimalTypeChart'), {
        type: 'doughnut',
        data: {
          labels: ['Perros', 'Gatos', 'Pájaros'],
          datasets: [
            {
              data: [50, 30, 20],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          }
        }
      });

      // Bar Chart - Monthly Sales
      new Chart(document.getElementById('monthlySalesChart'), {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Ventas',
              data: [200, 250, 300, 350, 400, 450],
              backgroundColor: '#36A2EB'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          }
        }
      });

      // Bar Chart - Monthly Adoptions
      new Chart(document.getElementById('monthlyAdoptionsChart'), {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Adopciones',
              data: [15, 20, 25, 30, 35, 40],
              backgroundColor: '#FF6384'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          }
        }
      });

      // Line Chart - Sales Trend
      new Chart(document.getElementById('salesTrendChart'), {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Ventas',
              data: [200, 250, 300, 350, 400, 450],
              borderColor: '#36A2EB',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          }
        }
      });

      // Line Chart - Adoptions Trend
      new Chart(document.getElementById('adoptionsTrendChart'), {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Adopciones',
              data: [15, 20, 25, 30, 35, 40],
              borderColor: '#FF6384',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          }
        }
      });

      // Nueva Line Chart - Total Sales
      new Chart(document.getElementById('totalSalesChart'), {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', ''],
          datasets: [
            {
              label: 'Total Sales',
              data: [30, 32, 28, 35, 33, 36, 37],
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              fill: true,
              tension: 0.4, // curva suavizada
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }, // Oculta la leyenda
          },
          scales: {
            x: { display: false }, // Oculta la escala en X
            y: { display: false }, // Oculta la escala en Y
          },
          elements: {
            line: {
              borderWidth: 2,
            },
            point: { radius: 0 } // Oculta los puntos en la línea
          }
        }
      });
    });
  }
};
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: 20px auto;
}
.v-card {
  max-width: 500px;
  margin: auto;
  border-radius: 12px;
  background-color: #f7f8fa;
}
.text-subtitle-2 {
  font-weight: bold;
}
</style>
