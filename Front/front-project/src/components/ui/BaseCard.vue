<template>
  <v-container fluid class="base-container pa-6">
    <v-card outlined class="base-card pa-4 rounded-lg elevation-4" color="surface">
      <slot name="header"></slot>
      <slot></slot>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
.base-container {
  background-color: #f7f9fc;
}

.base-card {
  color: white;
}
</style>