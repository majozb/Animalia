<template>
  <div>
    <h1>Analíticas</h1>
    <section class="section">
      <WidgetGraph icon="mdi-shopping-outline" Color="#4CAF50" title="Ventas Totales" price="36,000€" :chartData="chartData"/>
      <WidgetGraph icon="mdi-currency-eur-off" Color="#e95917" title="Gastos Totales" price="25,000€" :chartData="chartData2"/>
      <WidgetGraph icon="mdi-basket-plus" Color="#bfbfbf" title="Número de Pedidos" price="35,570" :chartData="chartData3"/>
      <WidgetGraph icon="mdi-chart-line" Color="#362ecf" title="Número de Visitantes" price="40,500" :chartData="chartData4"/>
    </section>
   
    <!-- Sección Doughnut -->
    <section class="section">
      <WidgetDonut chartId="productsByCategory" title="Productos por Categoría" :chartData="productsChartData"/>
      <WidgetDonut chartId="adoptionsByAnimal" title="Adopciones por Tipo de Animal" :chartData="adoptionsChartData" />
    </section>
    <section class="section">
      <GenericTable title="Resumen de los Últimos Productos Subidos" :headers="headers" :items="products" />
      <GenericTable title="Proveedores dados de alta" :headers="headers2" :items="providers" />
    </section>

  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import WidgetGraph from './WidgetGraphLine.vue';
import WidgetDonut from './WidgetDonut.vue';
import GenericTable from './GenericTable.vue';


// Registra todos los componentes de Chart.js
Chart.register(...registerables);

export default {
  name: 'AnaliticsData',
  components: {
    WidgetGraph,
    WidgetDonut,
    GenericTable
  },
  data() {
    return {
      counter_alimentos: 0,
      counter_accesorios: 0,
      counter_salud: 0,
      chartData: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'Total Ventas',
            data: [30, 32, 28, 35, 33, 36, 37],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.3)',
            fill: true,
            tension: 0.4
          }]
      },
      chartData2: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'Total Gastos',
            data: [30, 32, 28, 35, 33, 36, 37],
            borderColor: '#e95917',
            backgroundColor: 'rgba(233, 89, 23, 0.3)',
            fill: true,
            tension: 0.4
          }]
      },
      chartData3: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'Número de Pedidos',
            data: [30, 32, 28, 35, 33, 36, 37],
            borderColor: '#bfbfbf',
            backgroundColor: 'rgba(191, 191, 191, 0.3)',
            fill: true,
            tension: 0.4
          }]
      },
      chartData4: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'Número de Visitantes',
            data: [30, 32, 28, 35, 33, 36, 37],
            borderColor: '#362ecf',
            backgroundColor: 'rgba(54, 46, 207, 0.3)',
            fill: true,
            tension: 0.4
          }]
      },
      productsChartData: {
        labels: ["Alimentos", "Accesorios", "Salud"],
        datasets: [
          {
            // data: [this.counter_alimentos, this.counter_accesorios, this.counter_salud],
            data: [50, 30, 20],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      adoptionsChartData: {
        labels: ["Perros", "Gatos", "Pájaros"],
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      headers: [
        { title: 'Nombre', key: 'name' },
        { title: 'Stock', key: 'stock' },
        { title: 'Descripción', key: 'description' },
        { title: 'Keywords', key: 'keywords' },
        { title: 'Dimensiones', key: 'dimensions' },
        { title: 'Peso', key: 'weight' },
        { title: 'Precio', key: 'price' }],
      products: [],
      headers2: [
        { title: 'Nombre y A', key: 'name' },
        { title: 'User', key: 'user' },
        { title: 'Email', key: 'email' },
        { title: 'N. teléfono', key: 'phone' }
      ],
      providers: []
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    async fetchProviders() {
      try {
        const response = await fetch('http://localhost:3000/providers');
        const data = await response.json();
        console.log('Data:', data);

        this.providers = data;
      } catch (error) {
        console.error('Error fetching providers:', error);
        return [];
      }
    },
    async productsChartDataFunction() {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        console.log('Data:', data);
        let counter_alimentos = 0;
        let counter_accesorios = 0;
        let counter_salud = 0;

        data.forEach((product) => {
          if (product.keywords.includes('alimentación')) {
            counter_alimentos++;
          } else if (product.keywords.includes('accesorios')) {
            counter_accesorios++;
          } else if (product.keywords.includes('salud')) {
            counter_salud++;
          }
        });

        console.log('Alimentos:', counter_alimentos);
        console.log('Accesorios:', counter_accesorios);
        console.log('Salud:', counter_salud);

        this.counter_accesorios = counter_accesorios;
        this.counter_alimentos = counter_alimentos;
        this.counter_salud = counter_salud;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchProviders();
    this.productsChartDataFunction();
  }
};

</script>

<style scoped>
.section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.widget-card {
  flex: 1 1 calc(25% - 20px);
  min-width: 250px;
}

@media (max-width: 768px) {

  .widget-card,
  .donut-chart {
    flex: 1 1 100%;
  }
}
</style>