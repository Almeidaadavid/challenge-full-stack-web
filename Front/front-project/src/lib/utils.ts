import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  autoClose?: number
  pauseOnHover?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}

const defaultOptions: ToastOptions = {
  autoClose: 3000,
  pauseOnHover: true,
  position: 'bottom-right',
}

export function showToast (message: string, type: ToastType = 'info', options: ToastOptions = {}) {
  const mergedOptions = { ...defaultOptions, ...options }

  switch (type) {
    case 'success': {
      toast.success(message, mergedOptions)
      break
    }
    case 'error': {
      toast.error(message, mergedOptions)
      break
    }
    case 'info': {
      toast.info(message, mergedOptions)
      break
    }
    case 'warning': {
      toast.warning(message, mergedOptions)
      break
    }
  }
}
