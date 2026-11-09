<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tarea: {
    type: Object,
    default: null
  }
})

const emitir = defineEmits(['guardar', 'actualizar', 'cancelar'])

const titulo = ref(props.tarea?.titulo || '')
const descripcion = ref(props.tarea?.descripcion || '')
const prioridad = ref(props.tarea?.prioridad || 'MEDIA')
const errorValidacion = ref('')

watch(
  () => props.tarea,
  (nuevaTarea) => {
    if (nuevaTarea) {
      titulo.value = nuevaTarea.titulo || ''
      descripcion.value = nuevaTarea.descripcion || ''
      prioridad.value = nuevaTarea.prioridad || 'MEDIA'
    } else {
      reiniciarFormulario()
    }
  }
)

function reiniciarFormulario() {
  titulo.value = ''
  descripcion.value = ''
  prioridad.value = 'MEDIA'
  errorValidacion.value = ''
}

function cancelarEdicion() {
  reiniciarFormulario()
  emitir('cancelar')
}

function enviarFormulario() {
  if (titulo.value.trim().length < 3) {
    errorValidacion.value = 'El título debe tener al menos 3 caracteres'
    return
  }

  const datos = {
    titulo: titulo.value.trim(),
    descripcion: descripcion.value.trim() || undefined,
    prioridad: prioridad.value
  }

  if (props.tarea) {
    emitir('actualizar', props.tarea.id, datos)
  } else {
    emitir('guardar', datos)
    reiniciarFormulario()
  }
}
</script>

<template>
  <form class="formulario" @submit.prevent="enviarFormulario">
    <h2>{{ tarea ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>

    <div v-if="errorValidacion" class="error-texto">
      {{ errorValidacion }}
    </div>

    <div class="campo">
      <label for="titulo">Título *</label>
      <input
        id="titulo"
        v-model="titulo"
        type="text"
        placeholder="Ej: Estudiar para el examen"
        required
      />
    </div>

    <div class="campo">
      <label for="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        v-model="descripcion"
        rows="3"
        placeholder="Detalles adicionales..."
      ></textarea>
    </div>

    <div class="campo">
      <label for="prioridad">Prioridad</label>
      <select id="prioridad" v-model="prioridad">
        <option value="BAJA">Baja</option>
        <option value="MEDIA">Media</option>
        <option value="ALTA">Alta</option>
      </select>
    </div>

    <div class="botones">
      <button type="submit" class="btn-guardar">
        {{ tarea ? 'Actualizar Tarea' : 'Guardar Tarea' }}
      </button>
      <button
        v-if="tarea"
        type="button"
        class="btn-cancelar"
        @click="cancelarEdicion"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.formulario {
  background: white;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-width: 500px;
}

h2 {
  margin-top: 0;
  margin-bottom: 16px;
}

.campo {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

input, textarea, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
}

.error-texto {
  color: #c62828;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.botones {
  display: flex;
  gap: 10px;
}

.btn-guardar {
  padding: 10px 18px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-cancelar {
  padding: 10px 18px;
  background-color: #9e9e9e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
