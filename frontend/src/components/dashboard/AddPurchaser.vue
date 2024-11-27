<template>
  <v-container class="add-purchaser">
    <h1>Añadir Comprador</h1>
    <v-row>
      <!-- Form Section: Contains the form for adding a new purchaser -->
      <v-col cols="12" md="6">
        <v-form ref="form" v-model="valid">
          <!-- Name Field: Text field for the purchaser's name, with validation -->
          <v-text-field
            v-model="purchaser.name"
            :rules="[v => !!v || 'Name is required']"
            label="Name"
            required
          ></v-text-field>

          <!-- Username Field: Text field for the purchaser's username, with validation -->
          <v-text-field
            v-model="purchaser.user"
            :rules="[v => !!v || 'Username is required']"
            autocomplete="new-username"
            label="Username"
            required
          ></v-text-field>

          <!-- Password Field: Text field for the purchaser's password, with validation -->
          <v-text-field
            v-model="purchaser.password"
            :rules="[v => !!v || 'Password is required']"
            label="Password"
            autocomplete="new-password"
            type="password"
            required
          ></v-text-field>

          <!-- Email Field: Text field for the purchaser's email, with validation -->
          <v-text-field
            v-model="purchaser.email"
            :rules="[v => /.+@.+/.test(v) || 'Invalid email']"
            label="Email"
          ></v-text-field>

          <!-- Phone Field: Text field for the purchaser's phone number, with validation -->
          <v-text-field
            v-model="purchaser.phone"
            :rules="[v => /^\d{9}$/.test(v) || 'Invalid phone number']"
            label="Phone"
          ></v-text-field>

          <!-- Submit Button: To submit the form and add a new purchaser -->
          <v-btn color="primary" @click="submit">Añadir</v-btn>

          <!-- Reset Button: To reset the form fields to their initial state -->
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-form>
      </v-col>

      <!-- List Section: Displays the list of all purchasers -->
      <v-col cols="12" md="6">
        <h2>Lista de Compradores</h2>

        <!-- Data Table: Displays a list of purchasers with actions (Edit/Delete) -->
        <v-data-table
          :headers="headers"
          :items="purchasers"
          item-value="_id"
          class="elevation-1"
        >
          <!-- Toolbar section at the top of the table -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Compradores</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <!-- Action buttons (Edit/Delete) for each purchaser -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.actions="{ item }">
            <v-btn icon color="primary" @click="editpurchaser(item)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deletepurchaser(item._id)">
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
  name: "AddPurchaser",  // Component name

  data() {
    return {
      valid: false,  // Holds form validation state
      purchaser: {
        name: "",  // purchaser name
        user: "",  // Username
        password: "",  // Password
        email: "",  // Email
        phone: "",  // Phone number
        pets: [],  // List of pets (initially empty)
      },
      purchasers: [],  // List of purchasers fetched from the server
      originalpurchaser: null,  // Holds the original purchaser data for comparison when editing
      headers: [
        { title: "Name", key: "name" },
        { title: "Username", key: "user" },
        { title: "Email", key: "email" },
        { title: "Phone", key: "phone" },
        { title: "Actions", key: "actions", sortable: false },
      ],
    };
  },

  mounted() {
    // Fetch the list of purchasers when the component is mounted
    this.fetchpurchasers();
  },

  methods: {
    // Method to fetch the list of purchasers from the server
    async fetchpurchasers() {
      try {
        const route = 'http://127.0.0.1:3000/purchasers';
        const response = await fetch(route);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        this.purchasers = data;  // Store fetched purchasers in the `purchasers` data property
      } catch (error) {
        console.error("Error fetching purchasers:", error);  // Handle any errors
      }
    },

    // Method to handle form submission (Add or Edit purchaser)
    async submit() {
      // Check if the form is valid before submitting
      if (this.$refs.form.validate()) {
        try {
          // If editing an existing purchaser, update their data
          if (this.originalpurchaser) {
            delete this.purchaser._id;  // Remove the _id field before updating
            delete this.purchaser.__v;  // Remove the __v field before updating
            if (this.ispurchaserModified()) {
              const route = `http://127.0.0.1:3000/purchasers/${this.originalpurchaser._id}`;
              const response = await fetch(
                route,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(this.purchaser),
                }
              );

              if (!response.ok) {
                throw new Error(`Error updating purchaser: ${response.statusText}`);
              }

              const updatedpurchaser = await response.json();
              // Replace the old purchaser data with the updated one
              const index = this.purchasers.findIndex((b) => b._id === updatedpurchaser._id);
              if (index !== -1) {
                this.purchasers.splice(index, 1, updatedpurchaser);
              }

              console.log("Updated purchaser:", updatedpurchaser);
            } else {
              console.log("No changes made to the data.");
            }
          } else {
            // If adding a new purchaser, create the new purchaser
            const route = 'http://127.0.0.1:3000/purchasers';
            const response = await fetch(route, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.purchaser),
            });

            if (!response.ok) {
              throw new Error(`Error adding purchaser: ${response.statusText}`);
            }

            const newpurchaser = await response.json();
            this.purchasers.push(newpurchaser);  // Add the new purchaser to the list
            console.log("Added new purchaser:", newpurchaser);
          }

          this.reset();  // Reset the form fields after submission
        } catch (error) {
          console.error("Error adding/updating purchaser:", error);
        }
      }
    },

    // Method to populate the form with purchaser details for editing
    async editpurchaser(purchaser) {
      this.purchaser = { ...purchaser };  // Copy purchaser data to the form
      this.originalpurchaser = { ...purchaser };  // Save original purchaser data for comparison
    },

    // Method to delete a purchaser
    async deletepurchaser(purchaserId) {
      try {
        const route = `http://127.0.0.1:3000/purchasers/${purchaserId}`;
        const response = await fetch(route, {
          method: "DELETE",  // Use DELETE HTTP method
        });

        if (!response.ok) {
          throw new Error(`Error deleting purchaser: ${response.statusText}`);
        }

        // Remove the deleted purchaser from the purchasers list
        this.purchasers = this.purchasers.filter((purchaser) => purchaser._id !== purchaserId);
        console.log("purchaser deleted:", purchaserId);
      } catch (error) {
        console.error("Error deleting purchaser:", error);
      }
    },

    // Method to check if the purchaser's data has been modified
    ispurchaserModified() {
      return JSON.stringify(this.purchaser) !== JSON.stringify(this.originalpurchaser);
    },

    // Method to reset the form fields
    reset() {
      this.$refs.form.reset();  // Reset the form
      this.purchaser = {
        name: "",
        user: "",
        password: "",
        email: "",
        phone: "",
      };
      this.originalpurchaser = null;  // Clear original purchaser data
    },
  },
};
</script>

<style scoped>
.add-purchaser {
  text-align: center;
}

.add-purchaser h1 {
  color: #003459;  /* Color for the title */
}

.v-toolbar {
  background-color: #003459;  /* Toolbar background color */
  color: white;  /* Toolbar text color */
}

.v-data-table {
  background-color: #F7DBA7;  /* Data table background color */
}

h2 {
  color: #003459;  /* Color for the secondary heading */
}

@media (max-width: 768px) {
  .add-purchaser {
    text-align: center;  /* Center text on small screens */
  }
  .v-col {
    margin-bottom: 20px;  /* Add margin to columns on small screens */
  }
}
</style>