<script setup lang="ts">
import { deleteStudent } from '@/api/services/StudentService';
import { showToast } from '@/lib/utils';
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: boolean,
  id: number,
  name: string
}>();

const emit = defineEmits(['update:modelValue', 'closed']);

const deleteTask = ref(false);

const close = () => {
  emit('update:modelValue', false);
};

const emitClosed = () => {
  emit('closed');
  close();
}

const removeStudent = async () => {
  deleteTask.value = true;
  try {
    await deleteStudent(props.id);
    emitClosed();
  } catch (error: any) {
    showToast(error.response.data.message, 'error');
  } finally {
    deleteTask.value = false;
  }
};
</script>

<template>
  <v-dialog v-model="props.modelValue" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        Remove student
      </v-card-title>

      <v-card-text>
        <span>Do you want to delete this student? {{ props.name }}</span>
      </v-card-text>

      <v-card-actions class="justify-end gap-2">
        <v-btn text color="grey" @click="close">
          Cancel
        </v-btn>
        <v-btn
          color="red darken-2"
          :loading="deleteTask"
          :disabled="deleteTask"
          @click="removeStudent"
        >
          <span>{{ deleteTask ? "Processing..." : "Delete" }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>