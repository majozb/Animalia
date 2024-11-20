<template>
  <v-container class="add-buyer">
    <h1>Añadir Comprador</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="buyer.name"
            :rules="[v => !!v || 'El nombre es requerido']"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="buyer.user"
            :rules="[v => !!v || 'El usuario es requerido']"
            autocomplete="new-username"
            label="Usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="buyer.password"
            :rules="[v => !!v || 'La contraseña es requerida']"
            label="Contraseña"
            autocomplete="new-password"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="buyer.email"
            :rules="[v => /.+@.+/.test(v) || 'Correo inválido']"
            label="Correo Electrónico"
          ></v-text-field>

          <v-text-field
            v-model="buyer.phone"
            :rules="[v => /^\d{9}$/.test(v) || 'Número de teléfono inválido']"
            label="Teléfono"
          ></v-text-field>

          <v-btn color="success" @click="submit">Añadir</v-btn>
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-form>
      </v-col>

      <v-col cols="12" md="6">
        <h2>Compradores Añadidos</h2>
        <v-list>
          <v-list-item
            v-for="(buyer, index) in buyers"
            :key="index"
          >
              <v-list-item-title>
                {{ buyer.name }}
                <v-btn class="icons" icon @click="editBuyer(buyer)">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn class="icons" icon @click="deleteBuyer(buyer._id)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-list-item-title>
    
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddBuyer',
  data() {
    return {
      valid: false,
      buyer: {
        name: '',
        user: '',
        password: '',
        email: '',
        phone: '',
        pets: []
      },
      buyers: [],
      originalBuyer: null,
    };
  },
  mounted() {
    this.fetchBuyers();
  },
  methods: {
    async fetchBuyers() {
      try {
        const response = await fetch('/api/purchasers');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        this.buyers = data;
      } catch (error) {
        console.error('Error fetching buyers:', error);
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          // Si tenemos un comprador original (lo que significa que estamos editando)
          if (this.originalBuyer) {
            // Verificar si los datos han cambiado
            if (this.isBuyerModified()) {
              // Si hay cambios, realizar la petición PUT
              const response = await fetch(`/api/purchasers/${this.originalBuyer._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.buyer)
              });

              if (!response.ok) {
                throw new Error(`Error al actualizar el comprador: ${response.statusText}`);
              }

              const updatedBuyer = await response.json();
              // Actualizar la lista de compradores
              const index = this.buyers.findIndex(b => b._id === updatedBuyer._id);
              if (index !== -1) {
                this.buyers.splice(index, 1, updatedBuyer);
              }

              console.log('Comprador actualizado:', updatedBuyer);
            } else {
              console.log('No se hicieron cambios en los datos.');
            }
          } else {
            // Crear un nuevo comprador
            const response = await fetch('/api/purchasers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.buyer)
            });

            if (!response.ok) {
              throw new Error(`Error al crear el comprador: ${response.statusText}`);
            }

            const newBuyer = await response.json();
            this.buyers.push(newBuyer);
            console.log('Comprador añadido:', newBuyer);
          }

          this.reset();
        } catch (error) {
          console.error('Error al añadir/actualizar comprador:', error);
        }
      }
    },
    async editBuyer(buyer) {
      // Cargar los datos del comprador en el formulario para editar
      this.buyer = { ...buyer };
      this.originalBuyer = { ...buyer }; // Guardar los datos originales del comprador para comparación
    },
    async deleteBuyer(buyerId) {
      try {
        const response = await fetch(`/api/purchasers/${buyerId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`Error al eliminar el comprador: ${response.statusText}`);
        }

        // Eliminar comprador de la lista local
        this.buyers = this.buyers.filter(buyer => buyer._id !== buyerId);
        console.log('Comprador eliminado:', buyerId);
      } catch (error) {
        console.error('Error al eliminar comprador:', error);
      }
    },
    isBuyerModified() {
      // Compara los datos originales con los datos actuales del formulario
      return JSON.stringify(this.buyer) !== JSON.stringify(this.originalBuyer);
    },
    reset() {
      this.$refs.form.reset();
      this.buyer = {
        name: '',
        user: '',
        password: '',
        email: '',
        phone: ''
      };
      this.originalBuyer = null; // Limpiar el comprador original
    }
  }
};
</script>

<style scoped>
.add-buyer {
  text-align: center;
}
.icons {
  margin-left: 10px;
  color: #007bff;
}
</style>
