import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    const savedState = JSON.parse(localStorage.getItem('userStore'));
    return savedState || { user: null, userType: null, userId: null };
  },

  actions: {
    setUser(userData) {
      this.user = userData.user;
      this.userType = userData.userType;
      this.userId = userData.userId;
      this.saveState();
    },
    clearUser() {
      this.user = null;
      this.userType = null;
      this.userId = null;
      localStorage.removeItem('userStore');
    },
    saveState() {
      localStorage.setItem('userStore', JSON.stringify(this.$state));
    },
  },
});
