<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getStudents } from '@/api/services/StudentService'
import router from '@/router'
import type { PaginationForm } from '@/api/forms/PaginationForm'
import type { StudentsResponse } from '@/api/responses/GetStudentsResponse'

const page = ref(1)
const search = ref('')

const headers: readonly {
  key?: string
  title?: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
}[] = [
  { title: 'ID', key: 'id', align: 'start' },
  { title: 'Name', key: 'name', align: 'start' },
  { title: 'Email', key: 'email', align: 'start' },
  { title: 'Student Registration', key: 'studentRegistration', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

const addStudent = () => {
  router.push('/students/new');
}
const editStudent = async (id: number) => {
  router.push(`/students/${id}`);
}


  const itemsPerPage = ref(5)
  const serverItems = ref<StudentsResponse[]>([]);
  const loading = ref(true)
  const totalItems = ref(0)
  const loadItems = async(options: any) => {
    debugger
    loading.value = true;
    
    try {
      const page = options.page ?? 1;
      const limit = options.itemsPerPage ?? 10;
      let sortBy: { key: string; order: 'asc' | 'desc' }[] | undefined = undefined;

      if (options.sortBy && options.sortBy.length > 0) {
        sortBy = options.sortBy.map((key: string, index: number) => ({
          key,
          order: options.sortDesc?.[index] ? 'desc' : 'asc',
        }));
      }

      const sortField = sortBy?.[0]?.key ?? '';
      const order = sortBy?.[0]?.order ?? 'asc';
      const response = await getStudents({ page, limit, sortField, order});
      serverItems.value = response.data;
      totalItems.value = response.totalItems;

    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

onMounted(() => {
    loadingItems();
});

const loadingItems = async () => {
    loadItems({page: page.value, limit: itemsPerPage.value, sortBy: []})
}
</script>

<template>
  <v-card flat class="pa-4 mt-4" color="surface">
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="text-h5 font-weight-medium">Students</div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="lg" @click="addStudent()">
        Add new student
      </v-btn>
    </v-card-title>

    <div class="d-flex align-center justify-space-between search-wrapper">
      <v-text-field
        v-model="search"
        density="comfortable"
        variant="outlined"
        placeholder="Search student by name..."
        hide-details
        class="flex-grow-1 mr-2"
        prepend-inner-icon="mdi-magnify"
        rounded
        dense
        @keyup.enter="loadItems"
      />
      <v-btn
        color="primary"
        rounded
        dense
        elevation="2"
        @click="loadItems"
        class="search-btn"
      >
        Search
      </v-btn>
    </div>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="name"
      density="compact"
      @update:options="loadItems"
      class="elevation-1 rounded mt-4"
    >
      <template v-slot:loading>
        <div class="flex items-center justify-center h-40">
          <v-progress-circular
            indeterminate
            color="primary"
            size="25"
          ></v-progress-circular>
          <span class="ml-2 text-gray-500">Loading...</span>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
          <div class="actions-container">
            <v-btn icon size="medium" color="primary" @click="editStudent(item.id)" variant="text">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="medium" @click="editStudent(item!.id)" color="error" variant="text">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

.v-data-table {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
  min-height: 75vh;
}

.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }

.flex { display: flex; }

.items-center { align-items: center; }

.justify-between { justify-content: space-between; }

.justify-start { justify-content: flex-start; }

.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }

.font-bold { font-weight: 700; }

.tracking-tight { letter-spacing: -0.025em; }

.text-gray-500 { color: #6B7280; }

.mt-1 { margin-top: 0.25rem; }

.rounded-lg { border-radius: 0.5rem; }

.w-full { 
  width: 100%; 
}

.actions-container {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.h-40 {
  height: 10rem;
}

.search-wrapper {
  max-width: 500px;
  margin-top: 1rem;
}

.search-btn {
  min-width: 100px;
  height: 40px;
  font-size: 0.875rem;
  text-transform: none;
}

</style>