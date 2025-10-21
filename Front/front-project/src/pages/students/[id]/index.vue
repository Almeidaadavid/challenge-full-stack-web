<script setup lang="ts">
import { getStudentById } from '@/api/services/StudentService';
import StudentComponent from '@/components/ui/StudentComponent.vue';
import type { Student } from '@/types/student.interface';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute();
const student = ref<Student | null>(null);
const emit = defineEmits(['reload']);



const handleSaved = () => {
  router.push('/students')
}
onMounted(async () => {
    try {
        debugger
        const id = Number((route.params as { id: string }).id);
        const data = await getStudentById(id);
        student.value = data;
    } catch (e) {
        console.error('Error loading student', e)
        router.push('/students')
    }
})
</script>

<template>
  <StudentComponent v-if="student" :student="student" @saved="handleSaved" />
  <div v-else class="fill-height d-flex align-center justify-center">
    <v-progress-circular
    indeterminate
    color="primary"
    size="30"
  />
  </div>
</template>