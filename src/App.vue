<script setup>
import { ref, onMounted } from 'vue'
import Navegacion from './components/Navegacion.vue'
import ListaTareas from './components/ListaTareas.vue'
import FormularioTarea from './components/FormularioTarea.vue'
import DetalleTarea from './components/DetalleTarea.vue'
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from './servicios/api'

const vistaActual = ref('lista')
const tareas = ref([])
const cargando = ref(false)
const error = ref(null)
const mensajeExito = ref(null)

const idTareaSeleccionada = ref(null)
const tareaAEditar = ref(null)

let controladorAbort = null

function establecerMensajeExito(mensaje) {
  mensajeExito.value = mensaje
  setTimeout(() => {
    mensajeExito.value = null
  }, 3000)
}

function cambiarVista(nuevaVista) {
  vistaActual.value = nuevaVista
  error.value = null
  tareaAEditar.value = null
  idTareaSeleccionada.value = null
  if (nuevaVista === 'lista') {
    cargarTareas()
  }
}

async function cargarTareas() {
  if (controladorAbort) {
    controladorAbort.abort()
  }
  controladorAbort = new AbortController()

  cargando.value = true
  error.value = null

  try {
    const datos = await obtenerTareas(controladorAbort.signal)
    tareas.value = datos
  } catch (err) {
    if (err.name !== 'AbortError') {
      error.value = err.message || 'Error al conectar con el servidor'
    }
  } finally {
    cargando.value = false
  }
}

async function agregarTarea(datosTarea) {
  cargando.value = true
  error.value = null
  try {
    await crearTarea(datosTarea)
    establecerMensajeExito('Tarea creada exitosamente')
    vistaActual.value = 'lista'
    await cargarTareas()
  } catch (err) {
    error.value = err.message || 'No se pudo crear la tarea'
    cargando.value = false
  }
}

async function guardarEdicion(id, datosTarea) {
  cargando.value = true
  error.value = null
  try {
    await actualizarTarea(id, datosTarea)
    establecerMensajeExito('Tarea actualizada exitosamente')
    tareaAEditar.value = null
    vistaActual.value = 'lista'
    await cargarTareas()
  } catch (err) {
    error.value = err.message || 'No se pudo actualizar la tarea'
    cargando.value = false
  }
}

function verDetalle(id) {
  idTareaSeleccionada.value = id
  vistaActual.value = 'detalle'
}

function iniciarEdicion(tarea) {
  tareaAEditar.value = tarea
  vistaActual.value = 'editar'
}

function cancelarFormulario() {
  tareaAEditar.value = null
  vistaActual.value = 'lista'
}

async function modificarEstadoTarea(id, nuevoEstado) {
  try {
    await actualizarTarea(id, { estado: nuevoEstado })
    const tareaEncontrada = tareas.value.find((t) => t.id === id)
    if (tareaEncontrada) {
      tareaEncontrada.estado = nuevoEstado
    }
    establecerMensajeExito('Estado actualizado')
  } catch (err) {
    error.value = err.message || 'No se pudo actualizar la tarea'
  }
}

async function borrarTarea(id) {
  try {
    await eliminarTarea(id)
    tareas.value = tareas.value.filter((t) => t.id !== id)
    establecerMensajeExito('Tarea eliminada exitosamente')
  } catch (err) {
    error.value = err.message || 'No se pudo eliminar la tarea'
  }
}

onMounted(() => {
  cargarTareas()
})
</script>

<template>
  <div class="contenedor-principal">
    <header>
      <h1>Gestor de Tareas</h1>
    </header>

    <Navegacion
      :vista-actual="vistaActual"
      @cambiarVista="cambiarVista"
    />

    <main>
      <ListaTareas
        v-if="vistaActual === 'lista'"
        :tareas="tareas"
        :cargando="cargando"
        :error="error"
        :mensaje-exito="mensajeExito"
        @cambiarEstado="modificarEstadoTarea"
        @eliminar="borrarTarea"
        @ver="verDetalle"
        @editar="iniciarEdicion"
        @reintentar="cargarTareas"
      />

      <FormularioTarea
        v-else-if="vistaActual === 'crear'"
        @guardar="agregarTarea"
      />

      <FormularioTarea
        v-else-if="vistaActual === 'editar'"
        :tarea="tareaAEditar"
        @actualizar="guardarEdicion"
        @cancelar="cancelarFormulario"
      />

      <DetalleTarea
        v-else-if="vistaActual === 'detalle'"
        :id-tarea="idTareaSeleccionada"
        @volver="cambiarVista('lista')"
        @editar="iniciarEdicion"
      />
    </main>
  </div>
</template>

<style scoped>
.contenedor-principal {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

header h1 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}
</style>
