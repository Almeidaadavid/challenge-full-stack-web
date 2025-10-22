<script setup lang="ts">
import { login, setUser } from '@/composable/authState'
import { loginUser } from '@/api/services/AuthService'
import { emailRules } from '@/utils/RulesUtils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@/lib/utils'

const loading = ref(false)
const router = useRouter()
const email = ref('')
const password = ref('')

const valid = ref(false);
const formRef = ref();

const processLogin = async () => {
  debugger
  const { valid } = await formRef.value.validate();
  if (!valid) {
    showToast('Please fill in the form correctly.', 'warning');
    return;
  }

  try {
    loading.value = true
    const data = await loginUser(email.value, password.value)
    login(data.token) 
    setUser({
      name: data.user.name,
      email: data.user.email
    });
    router.push('/dashboard')
    showToast('Login successful!', 'success');
  } catch (error: any) {
    showToast(error.response.data.message, 'error');
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <v-app>
    <v-main class="login-page">
      <v-card elevation="8" width="400" class="pa-8 rounded-lg">
        <v-card-title class="text-h5 text-center font-weight-bold mb-4">
          Welcome 👋
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-text-field
              v-model="email"
              label="Login"
              :rules="emailRules"
              variant="outlined"
              density="comfortable"
              @keydown.enter="processLogin"
              required
            />

            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              variant="outlined"
              density="comfortable"
              class="mt-3"
              @keydown.enter="processLogin"
              required
            />

            <v-btn
              color="primary"
              class="mt-6"
              block
              :loading="loading"
              :disabled="loading"
              @click="processLogin"
            >
              {{ loading ? 'Processando...' : 'Acessar' }}
            </v-btn>
          </v-form>

          <div class="text-center mt-6">
            <span class="text-body-2 text-grey-darken-1">
              Esqueceu sua senha?
              <a href="#" class="text-primary text-no-underline">
                Recuperar acesso
              </a>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #dbeafe, #93c5fd);
}
.mt-3 { 
  margin-top: 0.75rem; 
}
.mt-6 { 
  margin-top: 1.5rem; 
}
.mb-4 { 
  margin-bottom: 1rem; 
}
.rounded-lg { 
  border-radius: 0.5rem; 
}
.text-no-underline { 
  text-decoration: none; 
}
.text-grey-darken-1 { 
  color: #616161; 
}
</style>
