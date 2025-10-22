<script setup lang="ts">
import { isLoggedIn, logout } from '@/composable/authState';
import { ref, watch } from 'vue'

import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: boolean, 
  user?: {name: string; email: string} | null
}>();
const emit = defineEmits<{(e: 'update:modelValue', value: boolean): void }>();
const internalDrawer = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  internalDrawer.value = val
});

watch(internalDrawer, (val) => {
  emit('update:modelValue', val)
});

const router = useRouter()
function handleLogout() {
  logout()
  router.push('/login')
}


</script>

<template>
  <v-navigation-drawer
    permanent
    class="navigation-drawer"
    :width="225"
    v-model="internalDrawer"
  >
    <div>
      <v-list>
          <v-list-item
            v-if="props.user"
            :title="props.user.name"
            :subtitle="props.user.email"
          />
          <v-list-item v-else title="Convidado" subtitle="guest@example.com" />
          <v-divider />
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-star" title="Dashboard" to="/dashboard" />
            <v-list-item prepend-icon="mdi-account-multiple" title="Students" to="/students" />
          </v-list>
      </v-list>
    </div>  
    <div v-if="isLoggedIn" class="drawer-footer">
      <v-divider />
      <v-list density="compact">
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sair"
          @click="handleLogout"
        />
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.navigation-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>