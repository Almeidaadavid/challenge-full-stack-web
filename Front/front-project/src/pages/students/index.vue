<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStudents } from '@/api/services/StudentService'
import router from '@/router'
import type { StudentsResponse } from '@/api/responses/GetStudentsResponse'
import StudentModal from '@/components/ui/StudentModal.vue'
import { maskCPF } from '@/utils/MaskUtils'
import BaseCard from '@/components/ui/BaseCard.vue'
import { showToast } from '@/lib/utils'

const page = ref(1)
const search = ref('')

const headers: readonly {
  key?: string
  title?: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
}[] = [
  { title: 'Name', key: 'name', align: 'start' },
  { title: 'Email', key: 'email', align: 'start' },
  { title: 'Student Registration', key: 'studentRegistration', align: 'start' },
  { title: 'Document', key: 'document', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

const addStudent = () => {
  router.push('/students/new');
}
const editStudent = async (id: number) => {
  router.push(`/students/${id}`);
}

const deleteStudent = (id: number, name: string) => {
  if (!id) return;
  if (!name) return;

  deleteModal.value = true;
  selectedStudentId.value = id;
  selectedStudentName.value = name;
}

const deleteModal = ref(false);
const selectedStudentId = ref<number | null>(null);
const selectedStudentName = ref<string>('');


  const itemsPerPage = ref(5)
  const serverItems = ref<StudentsResponse[]>([]);
  const loading = ref(true)
  const totalItems = ref(0)
  const loadItems = async(options: any) => {
    loading.value = true;
    
    try {
      const page = options.page ?? 1;
      const limit = options.itemsPerPage ?? 10;
      let sortBy: { key: string; order: 'asc' | 'desc' }[] | undefined = undefined;
      const searchTerm = search.value.trim() ?? ''; 
      if (options.sortBy && options.sortBy.length > 0) {
        sortBy = options.sortBy.map((key: string, index: number) => ({
          key,
          order: options.sortDesc?.[index] ? 'desc' : 'asc',
        }));
      }

      const sortField = sortBy?.[0]?.key ?? '';
      const order = sortBy?.[0]?.order ?? 'asc';
      const response = await getStudents({ search: searchTerm, page, limit, sortField, order});
      const formattedResponse = response.data.map(item => ({
          ...item,
          document: maskCPF(item.document),
        }));
      serverItems.value = formattedResponse;
      totalItems.value = response.totalItems;

    } catch (error: any) {
      showToast(error.response.data.message, 'error');
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
  <BaseCard>
    <template #header>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h4 font-weight-bold">📚 Students Overview</div>
        <v-btn color="primary" prepend-icon="mdi-plus-circle" rounded="lg" @click="addStudent()">Add New Student</v-btn>
      </v-card-title>
    </template>
    <div class="d-flex align-center justify-start search-wrapper mt-4">
      <v-text-field
        v-model="search"
        placeholder="Search student by name..."
        rounded dense variant="outlined"
        prepend-inner-icon="mdi-magnify"
        class="flex-grow-1 search-input mr-2"
        hide-details
        @keyup.enter="loadItems"
      />
      <v-btn color="primary" rounded dense class="search-btn" @click="loadItems">Search</v-btn>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="id"
      @update:options="loadItems"
      class="elevation-1 rounded-lg mt-4"
      density="compact"
    >
      <template v-slot:loading>
        <div class="flex items-center justify-center h-40">
          <v-progress-circular indeterminate color="primary" size="25"></v-progress-circular>
          <span class="ml-2 text-gray-500">Loading...</span>
        </div>
      </template>
      <template v-slot:no-data>
        <div class="flex items-center justify-center h-40">
          <span class="ml-2 text-gray-500">No students found</span>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="actions-container">
          <v-btn icon size="medium" color="primary" variant="text" @click="editStudent(item.id)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon size="medium" color="error"   variant="text" @click="deleteStudent(item.id, item.name)"><v-icon>mdi-delete</v-icon></v-btn>
        </div>
      </template>
    </v-data-table-server>

    <StudentModal 
      v-model="deleteModal" 
      :id="selectedStudentId!" 
      :name="selectedStudentName" 
      @closed="loadingItems()"
    />
  </BaseCard>
</template>

<style scoped>

.v-data-table {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
  min-height: 65vh;
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