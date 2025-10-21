<script setup lang="ts">
type StudentForm = Omit<Student, 'id'>;
import { createStudent, updateStudent } from '@/api/services/StudentService'
import type { Student } from '@/types/student.interface';
import { maskCPF, maskEmail, maskPhone, unmaskCellphone, unmaskCPF } from '@/utils/MaskUtils';
import { cellphoneRules, documentRules, emailRules, nameRules, studentRegistrationRules } from '@/utils/RulesUtils';
import { ref, watch, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['saved']);
const loading = ref(false);
const formRef = ref();

const props = defineProps<{ student?: Student }>();

const internalStudent = ref<StudentForm>({
  name: props.student?.name ?? '',
  email: props.student?.email ?? '',
  studentRegistration: props.student?.studentRegistration ?? '',
  document:  maskCPF(props.student?.document) ?? '',
  course: props.student?.course ?? '',
  cellphone: maskPhone(props.student?.cellphone) ?? ''
});

watch(() => props.student, (newVal) => {
  internalStudent.value = {
    name: newVal?.name ?? '',
    email: newVal?.email ?? '',
    studentRegistration: newVal?.studentRegistration ?? '',
    document: maskCPF(newVal?.document) ?? '',
    course: newVal?.course ?? '',
    cellphone: maskPhone(newVal?.cellphone) ?? ''
  };
});

const isEdit = ref(!!props.student?.id);
watch(() => props.student?.id, (newId) => {
  isEdit.value = !!newId;
});

function onCPFInput(e: Event) {
  const target = e.target as HTMLInputElement
  internalStudent.value.document = maskCPF(target.value)
}

const onStudentRegistrationInput = (val: string) => {
  internalStudent.value.studentRegistration = val.replace(/\D/g, '')
}

function onPhoneInput(e: Event) {
  const target = e.target as HTMLInputElement
  internalStudent.value.cellphone = maskPhone(target.value)
}

function onEmailInput(e: Event) {
  const target = e.target as HTMLInputElement
  internalStudent.value.email = maskEmail(target.value)
}

const editStudent = async (student: Student) => {
    debugger
  loading.value = true;
  try {
    await updateStudent(student.id!, {
      name: student.name!,
      cellphone: student.cellphone!,
      email: student.email!,
      course: student.course!,
    });
    emit('saved');
  } catch (error) {
    console.error('Error updating student:', error);
  } finally {
    loading.value = false;
  }
};

const addStudent = async () => {
  loading.value = true;
  try {
    const newStudent = {
      name: internalStudent.value.name!,
      email: internalStudent.value.email!,
      course: internalStudent.value.course!,
      cellphone: unmaskCellphone(internalStudent.value.cellphone!),
      studentRegistration: internalStudent.value.studentRegistration!,
      document: unmaskCPF(internalStudent.value.document!),
    };
    await createStudent(newStudent);
    emit('saved');
  } catch (error) {
    console.error('Error creating student:', error);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  debugger

  if (isEdit.value) {
    await editStudent({ ...internalStudent.value, id: props.student!.id });
    return;
  };
  await addStudent();
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card flat class="create-student-card">
      <v-card-title class="card-title">
        {{ isEdit ? 'Update Student' : 'Create Student' }}
      </v-card-title>

      <v-card-subtitle class="card-subtitle">
        Fill in the student information below to {{ isEdit ? 'update' : 'create' }} a student.
      </v-card-subtitle>

      <v-divider class="my-4"></v-divider>

      <v-form @submit.prevent="handleSubmit" ref="formRef">
        <v-row dense>
          <v-col cols="12" md="6" class="mb-4">
            <v-text-field
              v-model="internalStudent.name"
              label="Name"
              placeholder="Enter student name"
              outlined
              dense
              required
              :rules="nameRules"
              prepend-inner-icon="mdi-account"
            />
          </v-col>

          <v-col cols="12" md="6" class="mb-4">
            <v-text-field
              v-model="internalStudent.email"
              label="Email"
              placeholder="student@example.com"
              outlined
              dense
              required
              :rules="emailRules"
              @input="onEmailInput"
              prepend-inner-icon="mdi-email-outline"
            />
          </v-col>

          <v-col cols="12" md="6" class="mb-4">
            <v-text-field
              v-model="internalStudent.studentRegistration"
              label="RN"
              placeholder="Enter registration number"
              outlined
              dense
              required
              :disabled="isEdit"
              :rules="studentRegistrationRules"
              prepend-inner-icon="mdi-card-account-details-outline"
              @input="onStudentRegistrationInput($event.target.value)"
            />
          </v-col>

          <v-col cols="12" md="6" class="mb-4">
            <v-text-field
              v-model="internalStudent.document"
              label="CPF"
              placeholder="000.000.000-00"
              outlined
              dense
              required
              :disabled="isEdit"
              :rules="documentRules"
              @input="onCPFInput"
              prepend-inner-icon="mdi-card-account-details"
            />
          </v-col>

          <v-col cols="12" md="6" class="mb-4">
            <v-text-field
              v-model="internalStudent.course"
              label="Course"
              placeholder="Enter course name"
              outlined
              dense
              required
              prepend-inner-icon="mdi-school-outline"
            />
          </v-col>

          <v-col cols="12" md="6" class="mb-4">
            <v-text-field
              v-model="internalStudent.cellphone"
              label="Cellphone"
              placeholder="(00) 00000-0000"
              outlined
              dense
              required
              :rules="cellphoneRules"
              @input="onPhoneInput"
              prepend-inner-icon="mdi-cellphone"
            />
          </v-col>
        </v-row>

        <div class="buttons-container">
          <router-link to="/students">
            <v-btn color="error" outlined prepend-icon="mdi-close">
              Cancel
            </v-btn>
          </router-link>

          <v-btn
            color="primary"
            rounded
            :loading="loading"
            :disabled="loading"
            type="submit"
            prepend-icon="mdi-check"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </v-btn>
        </div>
      </v-form>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<style scoped>
.create-student-card {
  max-width: 700px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.card-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 24px;
}

.mb-4 {
  margin-bottom: 16px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}
</style>