import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    })
  }
}

registrarServiceWorker()
