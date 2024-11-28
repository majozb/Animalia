<template>
  <!-- Container for the "Add Pet" form and pet list -->
  <v-container class="add-pet">
    <!-- Main heading for the form -->
    <h1>{{ originalPet ? "Editar Mascota" : "Añadir Mascota" }}</h1>
    <v-row>
      <v-col cols="12" md="6">
        <!-- Form for adding a new pet -->
        <v-form ref="form" v-model="valid">
          <!-- Pet name input field with validation -->
          <v-text-field v-model="pet.name" :rules="[v => !!v || 'Name is required']" label="Pet Name"
            required></v-text-field>

          <!-- Pet description input field -->
          <v-textarea v-model="pet.description" label="Description" rows="3"></v-textarea>

          <!-- Pet type input field with validation -->
          <v-text-field v-model="pet.type" :rules="[v => !!v || 'Type is required']" label="Pet Type"
            required></v-text-field>

          <!-- Pet breed input field with validation -->
          <v-text-field v-model="pet.breed" :rules="[v => !!v || 'Breed is required']" label="Breed"
            required></v-text-field>

          <!-- Combobox for selecting multiple vaccines -->
          <v-combobox v-model="pet.vaccines" :items="vaccinesOptions" label="Vaccines" multiple></v-combobox>

          <!-- Combobox for selecting multiple medications -->
          <v-combobox v-model="pet.medication" :items="medicationOptions" label="Medications" multiple></v-combobox>

          <!-- Pet birth date input field -->
          <v-text-field v-model="pet.birthDate" label="Birth Date" :rules="[v => !!v || 'Birth date is required']"
            type="date"></v-text-field>

          <!-- Radio buttons for selecting pet gender -->
          <v-radio-group v-model="pet.genre" :rules="[v => v !== null || 'Gender is required']" label="Gender" row>
            <v-radio label="Female" :value="true"></v-radio>
            <v-radio label="Male" :value="false"></v-radio>
          </v-radio-group>

          <!-- Field to upload pet image -->
          <v-file-input v-model="imageToUpload" label="Upload Pet Image" accept="image/*" required></v-file-input>

          <!-- Button to submit the form -->
          <v-btn color="primary" @click="submit">Añadir mascota</v-btn>
          <!-- Button to reset the form -->
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-form>
      </v-col>

      <!-- Section to display the list of pets -->
      <v-col cols="12" md="6">
        <h2>Mascotas del usuario</h2>
        <v-data-table :headers="tableHeaders" :items="pets" item-value="_id" class="elevation-1">
          <!-- Toolbar section with title -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Mascotas</v-toolbar-title>
            </v-toolbar>
          </template>

          <!-- Action buttons for each pet (edit and delete) -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
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
      valid: false,  // Form validity flag
      pet: {         // Object holding pet data
        name: "",
        description: "",
        type: "",
        breed: "",
        vaccines: [],
        birthDate: "",
        medication: [],
        images: [],
        genre: null,
      },
      imageToUpload: null,  // Image to upload
      pets: [],       // Array to hold the list of pets
      vaccinesOptions: ["Rabia", "Parvovirus", "Distemper", "Hepatitis", "Moquillo"], // Vaccine options
      medicationOptions: ["Antibióticos", "Desparasitarios", "Analgésicos"], // Medication options
      originalPet: null,  // Original pet data for editing
      datePicker: false,  // Flag for date picker
      tableHeaders: [     // Table headers for displaying pets
        { title: "Name", key: "name" },
        { title: "Type", key: "type" },
        { title: "Breed", key: "breed" },
        { title: "Vaccines", key: "vaccines" },
        { title: "Birth Date", key: "birthDate" },
        { title: "Gender", key: "genre" },
        { title: "Medications", key: "medication" },
        { title: "Images", key: "images" },
        { title: "Gender", key: "genre" },
        { title: "Actions", key: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    // Fetch pets when component is mounted
    this.fetchPets();
  },
  methods: {
    // Method to fetch pets data
    async fetchPets() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;
        const userType = userStore.userType;

        if (!userId) throw new Error("User ID not found");

        // Fetch user data by userId
        const route = `http://localhost:3000/${userType}s/${userId}`;
        const Response = await fetch(route);
        if (!Response.ok) throw new Error(`Error fetching ${userType} data`);

        const Data = await Response.json();

        const petIds = Data.pets || []; // Get pet IDs from purchaser data
        if (!petIds.length) {
          this.pets = [];  // If no pets, set empty list
          return;
        }

        // Fetch pet details using petIds
        const petDetailsPromises = petIds.map((petId) =>
          fetch(`http://localhost:3000/pets/${petId}`).then((response) => {
            if (!response.ok) throw new Error(`Error fetching pet ${petId}`);
            return response.json();
          })
        );

        // Wait for all pet details and update the pets list
        this.pets = await Promise.all(petDetailsPromises);
      } catch (error) {
        console.error("Error loading pets:", error);
      }
    },
    // Method to submit the form and add a new pet
    async submit() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;
        const userType = userStore.userType;
        let flag = false;

        if (!userId) throw new Error("User ID not found");

        if (this.originalPet && this.originalPet.birthDate) {
          this.pet.birthDate = this.originalPet.birthDate.split('T')[0];
        }

        if (this.originalPet) {
          const formData = new FormData();
          formData.append('name', this.pet.name || this.originalPet.name);
          formData.append('description', this.pet.description || this.originalPet.description);
          formData.append('type', this.pet.type || this.originalPet.type);
          formData.append('breed', this.pet.breed || this.originalPet.breed);
          formData.append('vaccines', JSON.stringify(this.pet.vaccines || this.originalPet.vaccines)); // Serializamos arrays
          formData.append('birthDate', this.pet.birthDate || this.originalPet.birthDate);
          formData.append('medication', JSON.stringify(this.pet.medication || this.originalPet.medication)); // Serializamos arrays
          formData.append('genre', String(this.pet.genre || this.originalPet.genre)); // Convertimos a string
          if (this.imageToUpload) formData.append('image', this.imageToUpload); // Verificamos si existe


          const response = await fetch(`http://localhost:3000/pets/${this.originalPet._id}`, {
            method: "PUT",
            body: formData,
          });

          console.log("Response:", response);
          console.log("Form data:", formData.getAll());
          console.log("This original.pet:", this.originalPet);

          if (!response.ok) throw new Error("Error updating pet");

          const updatedPet = await response.json();
          console.log("Updated pet:", updatedPet);
          const index = this.pets.findIndex((p) => p._id === updatedPet._id);
          if (index !== -1) this.pets.splice(index, 1, updatedPet);
          this.reset();
        } else {
          if (!this.imageToUpload) throw new Error("Image is required");
          const formData = new FormData();
          formData.append('name', this.pet.name);
          formData.append('description', this.pet.description);
          formData.append('type', this.pet.type);
          formData.append('breed', this.pet.breed);
          formData.append('vaccines', this.pet.vaccines);
          formData.append('birthDate', this.pet.birthDate);
          formData.append('medication', this.pet.medication);
          formData.append('genre', this.pet.genre);
          formData.append('image', this.imageToUpload);

          const response = await fetch('http://localhost:3000/pets', {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Error adding pet");
          }
          const newPet = await response.json();
          flag = true;
          await fetch(`http://127.0.0.1:3000/${userType}s/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ petId: newPet._id }),
          });

          this.pets.push(newPet);
          this.reset();
        }
      } catch (error) {
        // if (flag) {
        //   this.pets.pop();
        //   // Deleting the pet from the database
        //   await fetch(`http://127.0.0.1:3000/pets/${this.pet._id}`, { method: "DELETE" });
        //   // Remove the image from the server

        // }
        console.error("Error adding pet:", error);
      }
    },
    // Method to edit an existing pet's data
    async editPet(pet) {
      this.pet = { ...pet };
      this.originalPet = { ...pet };
      if (this.pet.birthDate) {
        this.pet.birthDate = this.pet.birthDate.split('T')[0]; // Formatting the date
      }
    },
    // Method to delete a pet
    async deletePet(petId) {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;
        const userType = userStore.userType;

        if (!userId) throw new Error("User ID not found");

        // Unlink the pet from the user
        const Response = await fetch(`http://127.0.0.1:3000/${userType}s/${userId}/removePet`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId }),
        });

        if (!Response.ok) throw new Error(`Error unlinking pet from ${userType}`);

        // Delete the pet from the database
        const response = await fetch(`http://127.0.0.1:3000/pets/${petId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error deleting pet");

        // Remove the deleted pet from the list
        this.pets = this.pets.filter((pet) => pet._id !== petId);
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    },
    // Reset the form to its initial state
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
        images: [],
      };
      this.originalPet = null;
    },
  },
};
</script>

<style scoped>
/* Styling for the data table */
.v-data-table th,
.v-data-table td {
  padding: 12px;
  text-align: left;
  white-space: nowrap;
}

.v-data-table td {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Styling for the data table container */
.v-data-table {
  overflow-x: auto;
  background-color: white;
  color: #003459;
}

h1,
h2 {
  color: #003459;
}

/* Styling for the toolbar */
.v-toolbar {
  background-color: #003459;
  color: white;
}
</style>
