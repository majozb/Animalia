<template>
  <v-container class="add-pet">
    <h1>Añadir Mascota</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="pet.name"
            :rules="[v => !!v || 'El nombre es requerido']"
            label="Nombre de la Mascota"
            required
          ></v-text-field>

          <v-textarea
            v-model="pet.description"
            label="Descripción"
            rows="3"
          ></v-textarea>

          <v-text-field
            v-model="pet.type"
            :rules="[v => !!v || 'El tipo es requerido']"
            label="Tipo de Mascota"
            required
          ></v-text-field>

          <v-text-field
            v-model="pet.breed"
            :rules="[v => !!v || 'La raza es requerida']"
            label="Raza"
            required
          ></v-text-field>

          <v-combobox
            v-model="pet.vaccines"
            :items="vaccinesOptions"
            label="Vacunas"
            multiple
          ></v-combobox>

          <v-combobox
            v-model="pet.medication"
            :items="medicationOptions"
            label="Medicamentos"
            multiple
          ></v-combobox>

          <v-text-field
            v-model="pet.birthDate"
            label="Fecha de Nacimiento"
            :rules="[v => !!v || 'La fecha de nacimiento es requerida']"
            type="date" 
          ></v-text-field>

          <v-radio-group
            v-model="pet.genre"
            :rules="[v => v !== null || 'El género es requerido']"
            label="Género"
            row
          >
            <v-radio label="Hembra" :value="true"></v-radio>
            <v-radio label="Macho" :value="false"></v-radio>
          </v-radio-group>

          <v-btn color="primary" @click="submit">Añadir Mascota</v-btn>
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-form>
      </v-col>

      <v-col cols="12" md="6">
        <h2>Mascotas del Usuario</h2>
        <v-data-table
          :headers="tableHeaders"
          :items="pets"
          item-value="_id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Mascotas</v-toolbar-title>
            </v-toolbar>
          </template>
          <template #item.actions="{ item }">
            <v-btn icon color="primary" @click="editPet(item)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deletePet(item._id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
export default {
  name: "AddPet",
  data() {
    return {
      valid: false,
      pet: {
        name: "",
        description: "",
        type: "",
        breed: "",
        vaccines: [],
        birthDate: "",
        medication: [],
        genre: null,
      },
      pets: [],
      vaccinesOptions: ["Rabia", "Parvovirus", "Moquillo", "Hepatitis"],
      medicationOptions: ["Antibióticos", "Desparasitantes", "Analgésicos"],
      datePicker: false,
      tableHeaders: [
        { title: "Nombre", key: "name" },
        { title: "Tipo", key: "type" },
        { title: "Raza", key: "breed" },
        { title: "Fecha de Nacimiento", key: "birthDate" },
        { title: "Género", key: "genre" },
        { title: "Vacunas", key: "vaccines" },
        { title: "Medicamentos", key: "medication" },
        { title: "Acciones", key: "actions", sortable: false }
      ],
    };
  },
  mounted() {
    this.fetchPets();
  },
  methods: {
    async fetchPets() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("No se encuentra el ID del usuario");

        // Llamada para obtener el comprador por el usuario
        const purchaserResponse = await fetch(`/api/purchasers/${userId}`);
        if (!purchaserResponse.ok) throw new Error("Error al obtener el comprador");

        const purchaserData = await purchaserResponse.json();

        // Extraer IDs de las mascotas del comprador
        const petIds = purchaserData.pets || [];
        if (!petIds.length) {
          this.pets = []; // No hay mascotas asociadas
          return;
        }

        // Llamada para obtener detalles de cada mascota
        const petDetailsPromises = petIds.map((petId) =>
          fetch(`/api/pets/${petId}`).then((response) => {
            if (!response.ok) throw new Error(`Error al obtener mascota ${petId}`);
            return response.json();
          })
        );

        this.pets = await Promise.all(petDetailsPromises);
      } catch (error) {
        console.error("Error al cargar las mascotas:", error);
      }
    },
    async submit() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("No se encuentra el ID del usuario");
        console.log("Pet:", this.pet);

        const response = await fetch(`http://localhost:3000/pets`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.pet),
        });

        console.log("response", response);
        if (!response.ok) throw new Error("Error al añadir mascota");

        const newPet = await response.json();
        console.log("Nueva mascota:", newPet);
        // Vincular la mascota al comprador
        const purchaserResponse = await fetch(`http://localhost:3000/purchasers/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId: newPet._id }),
        });

        if (!purchaserResponse.ok) throw new Error("Error al vincular mascota con comprador");

        // Añadir mascota a la lista local
        this.pets.push(newPet);
        this.reset();
      } catch (error) {
        console.error("Error al añadir mascota:", error);
      }
    },
    async editPet(pet) {
      this.pet = { ...pet };
    },
    async deletePet(petId) {
      try {
        // Eliminar la mascota del comprador
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("No se encuentra el ID del usuario");

        const purchaserResponse = await fetch(`/api/purchasers/${userId}/removePet`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId }),
        });

        if (!purchaserResponse.ok) throw new Error("Error al desvincular mascota del comprador");

        // Eliminar la mascota del sistema
        const response = await fetch(`/api/pets/${petId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al borrar mascota");

        // Actualizar la lista local de mascotas
        this.pets = this.pets.filter((pet) => pet._id !== petId);
      } catch (error) {
        console.error("Error al borrar mascota:", error);
      }
    },
    reset() {
      this.$refs.form.reset();
      this.pet = {
        name: "",
        description: "",
        type: "",
        breed: "",
        vaccines: [],
        birthDate: "",
        medication: [],
        genre: null,
      };
    },
  },
};

</script>

<style scoped>

.v-data-table th,
.v-data-table td {
  padding: 12px;
  text-align: left;
  white-space: nowrap; /* Evitar salto de línea */
}

.v-data-table td {
  max-width: 200px; /* Limitar ancho de las columnas */
  overflow: hidden;
  text-overflow: ellipsis; /* Añadir puntos suspensivos si el texto es demasiado largo */
}

.v-data-table {
  overflow-x: auto; /* Scroll horizontal si es necesario */
  background-color: #F7DBA7;
  color: #003459;
}
h1, h2 {
  color: #003459;
}
.v-toolbar {
  background-color: #003459;
  color: white;
}
</style>

