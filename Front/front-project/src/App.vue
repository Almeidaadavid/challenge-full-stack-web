<template>
  <v-app>
    <v-main class="application-layout">
      <div v-if="showLayout">
        <AppBarComponent @toggle-drawer="drawer = !drawer" />
        <NavigationDrawerComponent v-model="drawer" :user="userRef" />
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBarComponent from './components/AppBarComponent.vue';
import NavigationDrawerComponent from './components/NavigationDrawerComponent.vue';
import { ref, computed } from 'vue'
import { isLoggedIn, user } from '@/composable/authState';
import { useRoute } from 'vue-router';
  const drawer = ref(false);
  const userRef = user;
  const route = useRoute();
  
  const publicPages = ['/login', '/register', '/forgot-password'];
  const showLayout = computed(() => isLoggedIn.value && !publicPages.includes(route.path));
</script>

<style scoped>
  .application-layout {
    background: #f9fafb;
  }
</style>