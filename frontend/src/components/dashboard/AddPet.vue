<template>
  <!-- Container for the "Add Pet" form and pet list -->
  <v-container class="add-pet">
    <!-- Main heading for the form -->
    <h1>Add Pet</h1>
    <v-row>
      <v-col cols="12" md="6">
        <!-- Form for adding a new pet -->
        <v-form ref="form" v-model="valid">
          <!-- Pet name input field with validation -->
          <v-text-field
            v-model="pet.name"
            :rules="[v => !!v || 'Name is required']"
            label="Pet Name"
            required
          ></v-text-field>

          <!-- Pet description input field -->
          <v-textarea
            v-model="pet.description"
            label="Description"
            rows="3"
          ></v-textarea>

          <!-- Pet type input field with validation -->
          <v-text-field
            v-model="pet.type"
            :rules="[v => !!v || 'Type is required']"
            label="Pet Type"
            required
          ></v-text-field>

          <!-- Pet breed input field with validation -->
          <v-text-field
            v-model="pet.breed"
            :rules="[v => !!v || 'Breed is required']"
            label="Breed"
            required
          ></v-text-field>

          <!-- Combobox for selecting multiple vaccines -->
          <v-combobox
            v-model="pet.vaccines"
            :items="vaccinesOptions"
            label="Vaccines"
            multiple
          ></v-combobox>

          <!-- Combobox for selecting multiple medications -->
          <v-combobox
            v-model="pet.medication"
            :items="medicationOptions"
            label="Medications"
            multiple
          ></v-combobox>

          <!-- Pet birth date input field -->
          <v-text-field
            v-model="pet.birthDate"
            label="Birth Date"
            :rules="[v => !!v || 'Birth date is required']"
            type="date" 
          ></v-text-field>

          <!-- Radio buttons for selecting pet gender -->
          <v-radio-group
            v-model="pet.genre"
            :rules="[v => v !== null || 'Gender is required']"
            label="Gender"
            row
          >
            <v-radio label="Female" :value="true"></v-radio>
            <v-radio label="Male" :value="false"></v-radio>
          </v-radio-group>

          <!-- Button to submit the form -->
          <v-btn color="primary" @click="submit">Add Pet</v-btn>
          <!-- Button to reset the form -->
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-form>
      </v-col>

      <!-- Section to display the list of pets -->
      <v-col cols="12" md="6">
        <h2>User's Pets</h2>
        <v-data-table
          :headers="tableHeaders"
          :items="pets"
          item-value="_id"
          class="elevation-1"
        >
          <!-- Toolbar section with title -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Pets</v-toolbar-title>
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
        genre: null,
      },
      pets: [],       // Array to hold the list of pets
      vaccinesOptions: ["Rabies", "Parvovirus", "Distemper", "Hepatitis"], // Vaccine options
      medicationOptions: ["Antibiotics", "Dewormers", "Painkillers"], // Medication options
      datePicker: false,  // Flag for date picker
      tableHeaders: [     // Table headers for displaying pets
        { title: "Name", key: "name" },
        { title: "Type", key: "type" },
        { title: "Breed", key: "breed" },
        { title: "Birth Date", key: "birthDate" },
        { title: "Gender", key: "genre" },
        { title: "Vaccines", key: "vaccines" },
        { title: "Medications", key: "medication" },
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

        if (!userId) throw new Error("User ID not found");

        // Fetch purchaser data by userId
        const purchaserResponse = await fetch(`/api/purchasers/${userId}`);
        if (!purchaserResponse.ok) throw new Error("Error fetching purchaser");

        const purchaserData = await purchaserResponse.json();

        const petIds = purchaserData.pets || []; // Get pet IDs from purchaser data
        if (!petIds.length) {
          this.pets = [];  // If no pets, set empty list
          return;
        }

        // Fetch pet details using petIds
        const petDetailsPromises = petIds.map((petId) =>
          fetch(`/api/pets/${petId}`).then((response) => {
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

        if (!userId) throw new Error("User ID not found");

        // Send new pet data to the backend API
        const response = await fetch(`http://localhost:3000/pets`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.pet),
        });

        if (!response.ok) throw new Error("Error adding pet");

        const newPet = await response.json();
        const purchaserResponse = await fetch(`http://localhost:3000/purchasers/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId: newPet._id }), // Link the pet to the user
        });

        if (!purchaserResponse.ok) throw new Error("Error linking pet with purchaser");

        this.pets.push(newPet); // Add new pet to the list
        this.reset(); // Reset the form
      } catch (error) {
        console.error("Error adding pet:", error);
      }
    },
    // Method to edit an existing pet's data
    async editPet(pet) {
      this.pet = { ...pet };
    },
    // Method to delete a pet
    async deletePet(petId) {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("User ID not found");

        // Unlink the pet from the purchaser
        const purchaserResponse = await fetch(`/api/purchasers/${userId}/removePet`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId }),
        });

        if (!purchaserResponse.ok) throw new Error("Error unlinking pet from purchaser");

        // Delete the pet from the database
        const response = await fetch(`/api/pets/${petId}`, { method: "DELETE" });
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
      };
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
  background-color: #F7DBA7;
  color: #003459;
}

h1, h2 {
  color: #003459;
}

/* Styling for the toolbar */
.v-toolbar {
  background-color: #003459;
  color: white;
}
</style>
