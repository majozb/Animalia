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
          <v-text-field v-model="pet.name" :rules="[v => !!v || 'Nombre']" label="Nombre de la mascota"
            required></v-text-field>

          <!-- Pet description input field -->
          <v-textarea v-model="pet.description" label="Descripción" rows="3"></v-textarea>

          <!-- Pet type input field with validation -->
          <v-text-field v-model="pet.type" :rules="[v => !!v || 'Tipo es requerido']" label="Tipo de mascota"
            required></v-text-field>

          <!-- Pet breed input field with validation -->
          <v-text-field v-model="pet.breed" :rules="[v => !!v || 'Raza']" label="Raza de la mascota"
            required></v-text-field>

          <!-- Combobox for selecting multiple vaccines -->
          <v-combobox v-model="pet.vaccines" :items="vaccinesOptions" label="Vacunas" multiple></v-combobox>

          <!-- Combobox for selecting multiple medications -->
          <v-combobox v-model="pet.medication" :items="medicationOptions" label="Medicaciones" multiple></v-combobox>

          <!-- Pet birth date input field -->
          <v-text-field v-model="pet.birthDate" label="Fecha de nacimiento"
            :rules="[v => !!v || 'Fecha de nacimiento es requerida']" type="date"></v-text-field>

          <!-- Radio buttons for selecting pet gender -->
          <v-radio-group v-model="pet.genre" :rules="[v => v !== null || 'Género es requerido']" label="Género" row>
            <v-radio label="Hembra" :value="true"></v-radio>
            <v-radio label="Macho" :value="false"></v-radio>
          </v-radio-group>

          <!-- Field to upload pet image -->

          <!-- Preview images to upload in list of cards with options to delete -->
          <v-card>
            <v-card-title>Imágenes de la mascota</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(image, index) in previewImages" :key="index" cols="12" md="6">
                  <v-card>
                    <v-img :src="image" aspect-ratio="1"></v-img>
                    <v-card-actions>
                      <v-btn icon color="error" @click="deleteImage(index)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-file-input label="Subir imagen de la mascota" accept="image/*" multiple required
            @change="addImageFiles"></v-file-input>

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
      imagesToUpload: [],  // Images to upload
      previewImages: [],     // Preview images
      pets: [],       // Array to hold the list of pets
      vaccinesOptions: ["Rabia", "Parvovirus", "Distemper", "Hepatitis", "Moquillo"], // Vaccine options
      medicationOptions: ["Antibióticos", "Desparasitarios", "Analgésicos"], // Medication options
      originalPet: null,  // Original pet data for editing
      datePicker: false,  // Flag for date picker
      tableHeaders: [     // Table headers for displaying pets
        { title: "Nombre", key: "name" },
        { title: "Tipo", key: "type" },
        { title: "Raza", key: "breed" },
        { title: "Vacunas", key: "vaccines" },
        { title: "Fecha de nacimiento", key: "birthDate" },
        { title: "Género", key: "genre" },
        { title: "Medicaciones", key: "medication" },
        { title: "Imágenes", key: "images" },
        { title: "Acciones", key: "actions", sortable: false },
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

        if (!userId) throw new Error("User ID not found");

        // Make sure the form is valid
        if (this.pet.birthDate) {
          this.pet.birthDate = this.pet.birthDate.split('T')[0];
        }

        // Convert vaccines to an array
        this.pet.vaccines = Array.isArray(this.pet.vaccines)
          ? this.pet.vaccines
          : this.pet.vaccines.split(",").map((vaccine) => vaccine.trim());

        // If there has been a pet selected for editing...
        if (this.originalPet) {
          // Update that existing pet
          delete this.pet._id;
          delete this.pet.__v; 
          // Check if the pet has been modified, if yes, update the pet with PUT request
          if (this.isPetModified()) {
            const route = `http://localhost:3000/pets/${this.originalPet._id}`;
            // Create a new FormData object and append the pet data for the backend to handle it
            const formData = new FormData();
            formData.append('name', this.pet.name);
            formData.append('description', this.pet.description);
            formData.append('type', this.pet.type);
            formData.append('breed', this.pet.breed);
            formData.append('vaccines', JSON.stringify(this.pet.vaccines));
            formData.append('birthDate', this.pet.birthDate);
            formData.append('medication', this.pet.medication);
            formData.append('genre', this.pet.genre);

            // The images are appended to the FormData object if there are any
            if (this.imagesToUpload && this.imagesToUpload.length > 0) {
              this.imagesToUpload.forEach((file) => {
                formData.append('images', file);
              });
            }
            // Then make the PUT request
            const response = await fetch(route, {
              method: "PUT",
              body: formData,
            });

            if (!response.ok) throw new Error("Error updating pet");

            const updatedPet = await response.json();
            const index = this.pets.findIndex((p) => p._id === updatedPet._id);
            if (index !== -1) this.pets.splice(index, 1, updatedPet);
            this.reset();
          } else {
            console.log("No changes made to the pet.");
          }
        } else {
          // No pet selected for editing, so add a new pet
          if (!this.imagesToUpload || this.imagesToUpload.length === 0) {
            throw new Error("At least one image is required"); // At least one image is required
          }
          // Create a new FormData object and append the pet data for the backend to handle it
          const formData = new FormData();
          formData.append('name', this.pet.name);
          formData.append('description', this.pet.description);
          formData.append('type', this.pet.type);
          formData.append('breed', this.pet.breed);
          formData.append('vaccines', JSON.stringify(this.pet.vaccines));
          formData.append('birthDate', this.pet.birthDate);
          formData.append('medication', this.pet.medication);
          formData.append('genre', this.pet.genre);
          // The images are appended to the FormData object if there are any (checked above)
          this.imagesToUpload.forEach((file) => {
            formData.append('images', file);
          });
          // Then make the POST request
          const response = await fetch('http://localhost:3000/pets', {
            method: "POST",
            body: formData,
          });
          // If the response is not OK, throw an error
          if (!response.ok) {
            throw new Error("Error adding pet");
          }
          // If the response is OK, get the new pet data and update the user owner with the new pet ID
          // in their pets array
          const newPet = await response.json();
          await fetch(`http://127.0.0.1:3000/${userType}s/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ petId: newPet._id }),
          });
          this.pets.push(newPet);
          this.reset();
        }
      } catch (error) {
        console.error("Error adding or updating pet:", error);
      }
    },

    // Method to prefill the form with the pet data for editing and update the images in the preview
    async editPet(pet) {
      this.pet = { ...pet };
      this.originalPet = { ...pet };
      if (this.pet.birthDate) {
        this.pet.birthDate = this.pet.birthDate.split('T')[0]; // Formatear la fecha
      }
      // Fetch the image links for the pet and convert them to files
      if (pet.images && pet.images.length > 0) {
        try {
          // Download images and convert them to files
          const imageFiles = await this.fetchImagesAsFiles(pet.images);
          this.imagesToUpload = [...imageFiles];
          this.generatePreviewImages();
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    },
    // Method to check if the pet has been modified
    isPetModified() {
      return JSON.stringify(this.pet) !== JSON.stringify(this.originalPet);
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
      this.imagesToUpload = [];
      this.clearPreviewImages();
    },
    addImageFiles(event) {
      const newFiles = Array.from(event.target.files);
      this.imagesToUpload = [...this.imagesToUpload, ...newFiles];
      this.generatePreviewImages();
    },
    // Clear the preview images
    clearPreviewImages() {
      this.previewImages.forEach((url) => URL.revokeObjectURL(url));
      this.previewImages = [];
    },
    // Delete an image from the list of images
    deleteImage(index) {

      this.imagesToUpload.splice(index, 1);
      this.generatePreviewImages();
    },
    // Generate preview images for the uploaded images
    generatePreviewImages() {
      // Clear the existing preview images to avoid duplicates
      this.clearPreviewImages();
      // Create preview images for the uploaded images in dinamic memory
      this.previewImages = this.imagesToUpload.map((file) =>
        URL.createObjectURL(file)
      );
    },
    // Fetch images as files
    async fetchImagesAsFiles(imageUrls) {
      const promises = imageUrls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching image from ${url}`);

        const blob = await response.blob();
        const filename = url.split("/").pop(); // get the filename from the URL
        return new File([blob], filename || "image.jpg", { type: blob.type });
      });

      return Promise.all(promises);
    },
  },
  // Clear the preview image links when the component is destroyed
  beforeDestroy() {
    this.clearPreviewImages();
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
