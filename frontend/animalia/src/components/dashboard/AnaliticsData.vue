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
      <GenericTable title="Resumen de los Últimos Productos Subidos" :headers="headers" :items="items" />
    </section>
    <section class="section">
      
      <GenericTable title="Proveedores dados de alta" :headers="headers2" :items="items2" />
    </section>
    
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import WidgetGraph  from '../WidgetGraphLine.vue';
import WidgetDonut from '../WidgetDonut.vue';
import GenericTable from '../home/GenericTable.vue';


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
        labels: ["Alimentos", "Juguetes", "Accesorios"],
        datasets: [
          {
            data: [300, 150, 200],
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
        { title: 'Nombre', key: 'nombre' },  
        { title: 'Stock', key: 'stock' }, 
        { title: 'Descripcion', key: 'descripcion' }, 
        { title: 'Keywords', key: 'keywords' }, 
        { title: 'Dimesiones', key: 'dimensiones' }, 
        { title: 'Peso', key: 'peso' },
        { title: 'ID Proveedor', key: 'id_proveedor'},
        { title: 'Precio', key: 'precio'}], 
      items: [ 
        { nombre: 'Collar para Perro', stock: 50, descripcion: 'Collar ajustable para perros de todos los tamaños.', keywords: 'collar, perro, ajustable', dimensiones: '40-60 cm', peso: '100 g', id_proveedor: 'PROV001', precio: '€10.00' }, 
        { nombre: 'Comida para Gato', stock: 200, descripcion: 'Alimento premium para gatos adultos.', keywords: 'comida, gato, premium', dimensiones: '20x10 cm', peso: '2 kg', id_proveedor: 'PROV002', precio: '€15.00' }, 
        { nombre: 'Juguete para Mascotas', stock: 120, descripcion: 'Juguete resistente y divertido para perros y gatos.', keywords: 'juguete, mascota, resistente', dimensiones: '15x15 cm', peso: '200 g', id_proveedor: 'PROV003', precio: '€8.00' }, 
        { nombre: 'Cama para Perros', stock: 30, descripcion: 'Cama cómoda y lavable para perros de todos los tamaños.', keywords: 'cama, perro, lavable', dimensiones: '80x60 cm', peso: '1.5 kg', id_proveedor: 'PROV004', precio: '€25.00' }, 
        { nombre: 'Jaula para Pájaros', stock: 15, descripcion: 'Jaula espaciosa para pájaros pequeños y medianos.', keywords: 'jaula, pájaro, espaciosa', dimensiones: '50x50x70 cm', peso: '3 kg', id_proveedor: 'PROV005', precio: '€45.00' }, 
        { nombre: 'Arena para Gatos', stock: 100, descripcion: 'Arena absorbente y sin olor para gatos.', keywords: 'arena, gato, absorbente', dimensiones: '30x20 cm', peso: '5 kg', id_proveedor: 'PROV006', precio: '€10.00' }, 
        { nombre: 'Transportador de Mascotas', stock: 20, descripcion: 'Transportador seguro y cómodo para mascotas pequeñas.', keywords: 'transportador, mascotas, seguro', dimensiones: '60x40x40 cm', peso: '2.5 kg', id_proveedor: 'PROV007', precio: '€35.00' }, 
        { nombre: 'Rascador para Gatos', stock: 40, descripcion: 'Rascador de sisal para gatos, ideal para afilar uñas.', keywords: 'rascador, gato, sisal', dimensiones: '30x30x70 cm', peso: '4 kg', id_proveedor: 'PROV008', precio: '€20.00' }, 
        { nombre: 'Hueso para Perros', stock: 300, descripcion: 'Hueso de goma duradero para morder.', keywords: 'hueso, perro, duradero', dimensiones: '20x5 cm', peso: '250 g', id_proveedor: 'PROV009', precio: '€5.00' }, 
        { nombre: 'Cepillo para Mascotas', stock: 70, descripcion: 'Cepillo para mantener el pelo de las mascotas limpio y suave.', keywords: 'cepillo, mascotas, pelo', dimensiones: '25x10 cm', peso: '150 g', id_proveedor: 'PROV010', precio:'€12.00' },
        { nombre: 'Cepillo para Mascotas', stock: 70, descripcion: 'Cepillo para mantener el pelo de las mascotas limpio y suave.', keywords: 'cepillo, mascotas, pelo', dimensiones: '25x10 cm', peso: '150 g', id_proveedor: 'PROV010', precio:'€12.00' }
      ],
      headers2: [
        { title: 'id', key: 'id' },
        { title: 'Nombre y A', key: 'nombre' },
        { title: 'User', key: 'user' },
        { title: 'Password', key: 'password' },
        { title: 'Numero', key: 'numero' },
        { title: 'Mail', key: 'mail' }
      ],
      items2: [
        { id: 'MongoDB1', nombre: 'Proveedor A', user: 'userA', password: 'hashedpasswordA', numero: '1234567890', mail: 'proveedora@mail.com'},
        { id: 'MongoDB2', nombre: 'Proveedor B', user: 'userB', password: 'hashedpasswordB', numero: '2345678901', mail: 'proveedorb@mail.com'},
        { id: 'MongoDB3', nombre: 'Proveedor C', user: 'userC', password: 'hashedpasswordC', numero: '3456789012', mail: 'proveedorc@mail.com'},
        { id: 'MongoDB4', nombre: 'Proveedor D', user: 'userD', password: 'hashedpasswordD', numero: '4567890123', mail: 'proveedord@mail.com'},
        { id: 'MongoDB5', nombre: 'Proveedor E', user: 'userE', password: 'hashedpasswordE', numero: '5678901234', mail: 'proveedore@mail.com'},
        { id: 'MongoDB6', nombre: 'Proveedor F', user: 'userF', password: 'hashedpasswordF', numero: '6789012345', mail: 'proveedorf@mail.com'},
        { id: 'MongoDB7', nombre: 'Proveedor G', user: 'userG', password: 'hashedpasswordG', numero: '7890123456', mail: 'proveedorg@mail.com'},
        { id: 'MongoDB8', nombre: 'Proveedor H', user: 'userH', password: 'hashedpasswordH', numero: '8901234567', mail: 'proveedorh@mail.com' },
        { id: 'MongoDB9', nombre: 'Proveedor I', user: 'userI', password: 'hashedpasswordI', numero: '9012345678', mail: 'proveedori@mail.com'},
        { id: 'MongoDB10', nombre: 'Proveedor J', user: 'userJ', password: 'hashedpasswordJ', numero: '0123456789', mail: 'proveedorj@mail.com'}
    ]
    }
  },
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
  .widget-card, .donut-chart { 
    flex: 1 1 100%; 
  } 
}

</style>
