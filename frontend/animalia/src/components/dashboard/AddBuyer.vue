<template>
  <v-container class="add-buyer">
    <h1>Add Buyer</h1>
    <v-row>
      <!-- Form Section: Contains the form for adding a new buyer -->
      <v-col cols="12" md="6">
        <v-form ref="form" v-model="valid">
          <!-- Name Field: Text field for the buyer's name, with validation -->
          <v-text-field
            v-model="buyer.name"
            :rules="[v => !!v || 'Name is required']"
            label="Name"
            required
          ></v-text-field>

          <!-- Username Field: Text field for the buyer's username, with validation -->
          <v-text-field
            v-model="buyer.user"
            :rules="[v => !!v || 'Username is required']"
            autocomplete="new-username"
            label="Username"
            required
          ></v-text-field>

          <!-- Password Field: Text field for the buyer's password, with validation -->
          <v-text-field
            v-model="buyer.password"
            :rules="[v => !!v || 'Password is required']"
            label="Password"
            autocomplete="new-password"
            type="password"
            required
          ></v-text-field>

          <!-- Email Field: Text field for the buyer's email, with validation -->
          <v-text-field
            v-model="buyer.email"
            :rules="[v => /.+@.+/.test(v) || 'Invalid email']"
            label="Email"
          ></v-text-field>

          <!-- Phone Field: Text field for the buyer's phone number, with validation -->
          <v-text-field
            v-model="buyer.phone"
            :rules="[v => /^\d{9}$/.test(v) || 'Invalid phone number']"
            label="Phone"
          ></v-text-field>

          <!-- Submit Button: To submit the form and add a new buyer -->
          <v-btn color="primary" @click="submit">Add</v-btn>

          <!-- Reset Button: To reset the form fields to their initial state -->
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-form>
      </v-col>

      <!-- List Section: Displays the list of all buyers -->
      <v-col cols="12" md="6">
        <h2>Buyers List</h2>

        <!-- Data Table: Displays a list of buyers with actions (Edit/Delete) -->
        <v-data-table
          :headers="headers"
          :items="buyers"
          item-value="_id"
          class="elevation-1"
        >
          <!-- Toolbar section at the top of the table -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Buyers</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <!-- Action buttons (Edit/Delete) for each buyer -->
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
  name: "AddBuyer",  // Component name

  data() {
    return {
      valid: false,  // Holds form validation state
      buyer: {
        name: "",  // Buyer name
        user: "",  // Username
        password: "",  // Password
        email: "",  // Email
        phone: "",  // Phone number
        pets: [],  // List of pets (initially empty)
      },
      buyers: [],  // List of buyers fetched from the server
      originalBuyer: null,  // Holds the original buyer data for comparison when editing
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
    // Fetch the list of buyers when the component is mounted
    this.fetchBuyers();
  },

  methods: {
    // Method to fetch the list of buyers from the server
    async fetchBuyers() {
      try {
        const response = await fetch("/api/purchasers");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        this.buyers = data;  // Store fetched buyers in the `buyers` data property
      } catch (error) {
        console.error("Error fetching buyers:", error);  // Handle any errors
      }
    },

    // Method to handle form submission (Add or Edit buyer)
    async submit() {
      // Check if the form is valid before submitting
      if (this.$refs.form.validate()) {
        try {
          // If editing an existing buyer, update their data
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
                throw new Error(`Error updating buyer: ${response.statusText}`);
              }

              const updatedBuyer = await response.json();
              // Replace the old buyer data with the updated one
              const index = this.buyers.findIndex((b) => b._id === updatedBuyer._id);
              if (index !== -1) {
                this.buyers.splice(index, 1, updatedBuyer);
              }

              console.log("Updated buyer:", updatedBuyer);
            } else {
              console.log("No changes made to the data.");
            }
          } else {
            // If adding a new buyer, create the new buyer
            const response = await fetch("/api/purchasers", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.buyer),
            });

            if (!response.ok) {
              throw new Error(`Error adding buyer: ${response.statusText}`);
            }

            const newBuyer = await response.json();
            this.buyers.push(newBuyer);  // Add the new buyer to the list
            console.log("Added new buyer:", newBuyer);
          }

          this.reset();  // Reset the form fields after submission
        } catch (error) {
          console.error("Error adding/updating buyer:", error);
        }
      }
    },

    // Method to populate the form with buyer details for editing
    async editBuyer(buyer) {
      this.buyer = { ...buyer };  // Copy buyer data to the form
      this.originalBuyer = { ...buyer };  // Save original buyer data for comparison
    },

    // Method to delete a buyer
    async deleteBuyer(buyerId) {
      try {
        const response = await fetch(`/api/purchasers/${buyerId}`, {
          method: "DELETE",  // Use DELETE HTTP method
        });

        if (!response.ok) {
          throw new Error(`Error deleting buyer: ${response.statusText}`);
        }

        // Remove the deleted buyer from the buyers list
        this.buyers = this.buyers.filter((buyer) => buyer._id !== buyerId);
        console.log("Buyer deleted:", buyerId);
      } catch (error) {
        console.error("Error deleting buyer:", error);
      }
    },

    // Method to check if the buyer's data has been modified
    isBuyerModified() {
      return JSON.stringify(this.buyer) !== JSON.stringify(this.originalBuyer);
    },

    // Method to reset the form fields
    reset() {
      this.$refs.form.reset();  // Reset the form
      this.buyer = {
        name: "",
        user: "",
        password: "",
        email: "",
        phone: "",
      };
      this.originalBuyer = null;  // Clear original buyer data
    },
  },
};
</script>

<style scoped>
.add-buyer {
  text-align: center;
}

.add-buyer h1 {
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
  .add-buyer {
    text-align: center;  /* Center text on small screens */
  }
  .v-col {
    margin-bottom: 20px;  /* Add margin to columns on small screens */
  }
}
</style>
