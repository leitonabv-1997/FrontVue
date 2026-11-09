<script setup>
import { ref, onMounted } from 'vue'
import { obtenerTareaPorId } from '../servicios/api'

const props = defineProps({
  idTarea: {
    type: [Number, String],
    required: true
  }
})

const emitir = defineEmits(['volver', 'editar'])

const tarea = ref(null)
const cargando = ref(true)
const error = ref(null)

async function cargarDetalle() {
  cargando.value = true
  error.value = null
  try {
    const datos = await obtenerTareaPorId(props.idTarea)
    tarea.value = datos
  } catch (err) {
    error.value = err.message || 'Error al obtener la tarea'
  } finally {
    cargando.value = false
  }
}

function regresar() {
  emitir('volver')
}

function iniciarEdicion() {
  emitir('editar', tarea.value)
}

onMounted(() => {
  cargarDetalle()
})
</script>

<template>
  <div class="tarjeta-detalle">
    <button class="btn-volver" @click="regresar">
      &larr; Volver a la lista
    </button>

    <div v-if="cargando" class="alerta cargando">
      Cargando detalle de la tarea...
    </div>

    <div v-else-if="error" class="alerta error">
      <p>{{ error }}</p>
      <button @click="cargarDetalle">Reintentar</button>
    </div>

    <div v-else-if="tarea" class="contenido-detalle">
      <h2>{{ tarea.titulo }}</h2>
      <p class="id-texto">ID: {{ tarea.id }}</p>

      <div class="campo-detalle">
        <strong>Descripción:</strong>
        <p>{{ tarea.descripcion || 'Sin descripción' }}</p>
      </div>

      <div class="campo-detalle">
        <strong>Estado:</strong>
        <span class="etiqueta">{{ tarea.estado }}</span>
      </div>

      <div class="campo-detalle">
        <strong>Prioridad:</strong>
        <span class="etiqueta">{{ tarea.prioridad }}</span>
      </div>

      <div v-if="tarea.creado_en" class="campo-detalle">
        <strong>Fecha de creación:</strong>
        <span>{{ new Date(tarea.creado_en).toLocaleString() }}</span>
      </div>

      <div class="acciones">
        <button class="btn-editar" @click="iniciarEdicion">
          Editar esta tarea
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tarjeta-detalle {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-width: 500px;
}

.btn-volver {
  background: none;
  border: none;
  color: #2196f3;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0;
  margin-bottom: 16px;
}

.id-texto {
  color: #888;
  font-size: 0.85rem;
  margin-top: -10px;
  margin-bottom: 15px;
}

.campo-detalle {
  margin-bottom: 12px;
}

.campo-detalle strong {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 2px;
}

.campo-detalle p {
  margin: 0;
}

.etiqueta {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #eee;
  font-size: 0.85rem;
}

.acciones {
  margin-top: 20px;
}

.btn-editar {
  padding: 8px 16px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.alerta {
  padding: 12px;
  border-radius: 4px;
  margin-top: 10px;
}

.alerta.cargando {
  background-color: #e3f2fd;
  color: #1565c0;
}

.alerta.error {
  background-color: #ffebee;
  color: #c62828;
}
</style>

