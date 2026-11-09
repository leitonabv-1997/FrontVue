<script setup>
import ItemTarea from './ItemTarea.vue'

defineProps({
  tareas: {
    type: Array,
    required: true
  },
  cargando: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  mensajeExito: {
    type: String,
    default: null
  }
})

const emitir = defineEmits([
  'cambiarEstado',
  'eliminar',
  'reintentar',
  'ver',
  'editar'
])

function emitirReintento() {
  emitir('reintentar')
}

function notificarEstado(id, nuevoEstado) {
  emitir('cambiarEstado', id, nuevoEstado)
}

function notificarEliminar(id) {
  emitir('eliminar', id)
}

function notificarVer(id) {
  emitir('ver', id)
}

function notificarEditar(tarea) {
  emitir('editar', tarea)
}
</script>

<template>
  <section class="contenedor-lista">
    <div v-if="mensajeExito" class="alerta exito">
      {{ mensajeExito }}
    </div>

    <div v-if="cargando" class="alerta cargando">
      Cargando tareas...
    </div>

    <div v-else-if="error" class="alerta error">
      <p>{{ error }}</p>
      <button @click="emitirReintento">Reintentar</button>
    </div>

    <div v-else-if="tareas.length === 0" class="alerta vacio">
      No hay tareas registradas. ¡Crea una nueva!
    </div>

    <ul v-else class="lista">
      <ItemTarea
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @cambiarEstado="notificarEstado"
        @eliminar="notificarEliminar"
        @ver="notificarVer"
        @editar="notificarEditar"
      />
    </ul>
  </section>
</template>

<style scoped>
.contenedor-lista {
  margin-top: 10px;
}

.lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alerta {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.alerta.exito {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.alerta.cargando {
  background-color: #e3f2fd;
  color: #1565c0;
}

.alerta.error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alerta.vacio {
  background-color: #f5f5f5;
  color: #616161;
  text-align: center;
}
</style>
