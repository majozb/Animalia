<template>
  <v-container class="add-buyer">
    <h1>Añadir Comprador</h1>
    <v-row>
      <!-- Formulario de Comprador -->
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

          <v-btn color="primary" @click="submit">Añadir</v-btn>
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-form>
      </v-col>

      <!-- Tabla de Compradores -->
      <v-col cols="12" md="6">
        <h2>Lista de Compradores</h2>
        <v-data-table
          :headers="headers"
          :items="buyers"
          item-value="_id"
          class="elevation-1"
        >
        <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Compradores</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template #item.actions="{ item }">
            <v-btn icon color="primary" @click="editBuyer(item)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteBuyer(item._id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddBuyer",
  data() {
    return {
      valid: false,
      buyer: {
        name: "",
        user: "",
        password: "",
        email: "",
        phone: "",
        pets: [],
      },
      buyers: [],
      originalBuyer: null,
      headers: [
        { title: "Nombre", key: "name" },
        { title: "Usuario", key: "user" },
        { title: "Correo Electrónico", key: "email" },
        { title: "Teléfono", key: "phone" },
        { title: "Acciones", key: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchBuyers();
  },
  methods: {
    async fetchBuyers() {
      try {
        const response = await fetch("/api/purchasers");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        this.buyers = data;
      } catch (error) {
        console.error("Error fetching buyers:", error);
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          if (this.originalBuyer) {
            if (this.isBuyerModified()) {
              const response = await fetch(
                `/api/purchasers/${this.originalBuyer._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(this.buyer),
                }
              );

              if (!response.ok) {
                throw new Error(
                  `Error al actualizar el comprador: ${response.statusText}`
                );
              }

              const updatedBuyer = await response.json();
              const index = this.buyers.findIndex(
                (b) => b._id === updatedBuyer._id
              );
              if (index !== -1) {
                this.buyers.splice(index, 1, updatedBuyer);
              }

              console.log("Comprador actualizado:", updatedBuyer);
            } else {
              console.log("No se hicieron cambios en los datos.");
            }
          } else {
            const response = await fetch("/api/purchasers", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.buyer),
            });

            if (!response.ok) {
              throw new Error(
                `Error al crear el comprador: ${response.statusText}`
              );
            }

            const newBuyer = await response.json();
            this.buyers.push(newBuyer);
            console.log("Comprador añadido:", newBuyer);
          }

          this.reset();
        } catch (error) {
          console.error("Error al añadir/actualizar comprador:", error);
        }
      }
    },
    async editBuyer(buyer) {
      this.buyer = { ...buyer };
      this.originalBuyer = { ...buyer };
    },
    async deleteBuyer(buyerId) {
      try {
        const response = await fetch(`/api/purchasers/${buyerId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error al eliminar el comprador: ${response.statusText}`);
        }

        this.buyers = this.buyers.filter((buyer) => buyer._id !== buyerId);
        console.log("Comprador eliminado:", buyerId);
      } catch (error) {
        console.error("Error al eliminar comprador:", error);
      }
    },
    isBuyerModified() {
      return JSON.stringify(this.buyer) !== JSON.stringify(this.originalBuyer);
    },
    reset() {
      this.$refs.form.reset();
      this.buyer = {
        name: "",
        user: "",
        password: "",
        email: "",
        phone: "",
      };
      this.originalBuyer = null;
    },
  },
};
</script>

<style scoped>
.add-buyer {
  text-align: center;
}

.add-buyer h1 {
  color: #003459;
}

.v-toolbar {
  background-color: #003459;
  color: white;
}

.v-data-table {
  background-color: #F7DBA7;
}

h2 {
  color: #003459;
}

@media (max-width: 768px) {
  .add-buyer {
    text-align: center;
  }
  .v-col {
    margin-bottom: 20px;
  }
}
</style>
