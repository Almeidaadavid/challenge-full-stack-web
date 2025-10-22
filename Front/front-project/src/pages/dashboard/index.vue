<template>
  <BaseCard>
    <template #header>
      <v-row class="mb-4">
        <v-col cols="12">
          <h1 class="text-h4">📚 Student Dashboard Overview</h1>
          <p class="text-subtitle-1 text-medium-emphasis">
            Welcome! Here's a summary of your management statistics.
          </p>
        </v-col>
      </v-row>
    </template>
    <v-row>
      <v-col cols="12" sm="6" lg="4">
        <v-card color="indigo-lighten-1" variant="flat" class="pa-4 text-white rounded-lg elevation-4">
          <v-icon size="36" icon="mdi-account-group"></v-icon>
          <div class="text-h4 mt-2 font-weight-bold">{{ obj?.totalStudents ?? 0 }}</div>
          <div class="text-subtitle-1">Total Students Enrolled</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card color="green-lighten-1" variant="flat" class="pa-4 text-white rounded-lg elevation-4">
          <v-icon size="36" icon="mdi-school"></v-icon>
          <div class="text-h4 mt-2 font-weight-bold">{{ obj?.totalCourses ?? 0 }}</div>
          <div class="text-subtitle-1">Active Programs/Courses</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card color="orange-lighten-1" variant="flat" class="pa-4 text-white rounded-lg elevation-4">
          <v-icon size="36" icon="mdi-account-plus"></v-icon>
          <div class="text-h4 mt-2 font-weight-bold">{{ obj?.lastStudents?.length ?? 0 }}</div>
          <div class="text-subtitle-1">New Students (This Month)</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col cols="12" lg="7">
        <v-card max-height="42vh" class="pa-4 rounded-lg elevation-2">
          <v-card-title class="text-h6 font-weight-bold">📊 Recent Student Activity</v-card-title>
          <v-list lines="three">
            <template v-for="student in obj?.lastStudents" :key="student.id">
              <v-list-item
                prepend-icon="mdi-school"
                :title="student.name"
                :subtitle="`Enrolled in '${student.course}' course.`"
              />
              <v-divider />
            </template>
          </v-list>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" color="indigo" disabled>View All Activity Log</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card class="pa-4 rounded-lg elevation-2" height="42vh">
          <v-card-title class="text-h6 font-weight-bold">⚡ Quick Actions</v-card-title>
          <v-row class="pt-2">
            <v-col cols="6">
              <v-btn block color="primary" variant="flat" size="large" prepend-icon="mdi-plus-circle" to="/students/new">Add Student</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="secondary" variant="flat" size="large" prepend-icon="mdi-magnify" to="/students">Search Students</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="warning" variant="flat" size="large" prepend-icon="mdi-pencil" disabled>Edit Student</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="error" variant="flat" size="large" prepend-icon="mdi-delete" disabled>Delete Student</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </BaseCard>
</template>

<script setup lang="ts">
import type { GetSummaryResponse } from '@/api/responses/GetSummaryResponse';
import { getSummary } from '@/api/services/StudentService';
import BaseCard from '@/components/ui/BaseCard.vue';
import { showToast } from '@/lib/utils';
import { onMounted, ref } from 'vue';

const obj = ref<GetSummaryResponse | null>(null);

  onMounted(async () => {
    try {
      const data = await getSummary();
      obj.value = data;
    } catch (error: any) {
      showToast(error.response.data.message, 'error');
    }
  });
</script>

<style scoped>
.v-container {
    background-color: #f7f9fc;
}
</style>