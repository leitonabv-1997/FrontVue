<script setup>
defineProps({
  vistaActual: {
    type: String,
    required: true
  }
})

const emitir = defineEmits(['cambiarVista'])

function irAVista(nombreVista) {
  emitir('cambiarVista', nombreVista)
}
</script>

<template>
  <nav class="barra-navegacion">
    <button
      :class="{ activo: vistaActual === 'lista' }"
      @click="irAVista('lista')"
    >
      Lista de Tareas
    </button>
    <button
      :class="{ activo: vistaActual === 'crear' }"
      @click="irAVista('crear')"
    >
      Nueva Tarea
    </button>
  </nav>
</template>

<style scoped>
.barra-navegacion {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

button.activo {
  background-color: #42b883;
  color: white;
  border-color: #42b883;
}
</style>

