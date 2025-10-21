<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="emit('toggle-drawer')" />
    <v-toolbar-title>My App</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts"> 
  const emit = defineEmits<{(e: 'toggle-drawer'): void}>()
</script>