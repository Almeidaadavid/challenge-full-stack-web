import { ref } from 'vue'

const token = localStorage.getItem('myToken')
export const isLoggedIn = ref(!!token)

export const user = ref<{ name: string; email: string } | null>(
  JSON.parse(localStorage.getItem('user') || 'null')
);

export function login (newToken: string) {
  localStorage.setItem('myToken', newToken)
  isLoggedIn.value = true;
}

export function logout () {
  localStorage.removeItem('myToken')
  isLoggedIn.value = false;
}

export function setUser(newUser: { name: string; email: string }) {
  user.value = newUser;
  localStorage.setItem('user', JSON.stringify(newUser));
}

export function clearUser() {
  user.value = null;
  localStorage.removeItem('user');
}
