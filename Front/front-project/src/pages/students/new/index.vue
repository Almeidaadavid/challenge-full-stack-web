<template>
  <StudentComponent @saved="handleSaved" />
</template>

<script setup lang="ts">
import StudentComponent from '@/components/ui/StudentComponent.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const handleSaved = () => {
  router.push('/students')
}
</script>