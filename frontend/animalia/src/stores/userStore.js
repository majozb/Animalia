import { defineStore } from 'pinia'; 

export const useUserStore = defineStore('user', { 
  state: () => {
    const savedState = JSON.parse(localStorage.getItem('userStore'));
    return savedState || { user: null, userType: null };
  }, 

  actions: {
    setUser(userData) {
      this.user = userData.user;
      this.userType = userData.userType;
      this.saveState();
    },
    clearUser() {
      this.user = null;
      this.userType = null;
      localStorage.removeItem('userStore');
    },
    saveState() {
      localStorage.setItem('userStore', JSON.stringify(this.$state));
    }
  },
  persist: {
    storage: localStorage,
  }
});