<script setup>
const props = defineProps({
  tarea: {
    type: Object,
    required: true
  }
})

const emitir = defineEmits(['cambiarEstado', 'eliminar', 'ver', 'editar'])

function alternarEstado() {
  const nuevoEstado = props.tarea.estado === 'COMPLETADA' ? 'PENDIENTE' : 'COMPLETADA'
  emitir('cambiarEstado', props.tarea.id, nuevoEstado)
}

function quitarTarea() {
  emitir('eliminar', props.tarea.id)
}

function verTarea() {
  emitir('ver', props.tarea.id)
}

function editarTarea() {
  emitir('editar', props.tarea)
}
</script>

<template>
  <li class="item-tarea" :class="{ completada: tarea.estado === 'COMPLETADA' }">
    <div class="info-tarea">
      <h3 class="titulo">{{ tarea.titulo }}</h3>
      <p v-if="tarea.descripcion" class="descripcion">{{ tarea.descripcion }}</p>
      <div class="detalles">
        <span class="etiqueta estado">{{ tarea.estado }}</span>
        <span class="etiqueta prioridad" :class="tarea.prioridad?.toLowerCase()">
          {{ tarea.prioridad }}
        </span>
      </div>
    </div>
    <div class="acciones">
      <button class="btn-ver" @click="verTarea">
        Ver
      </button>
      <button class="btn-editar" @click="editarTarea">
        Editar
      </button>
      <button class="btn-estado" @click="alternarEstado">
        {{ tarea.estado === 'COMPLETADA' ? 'Desmarcar' : 'Completar' }}
      </button>
      <button class="btn-eliminar" @click="quitarTarea">
        Eliminar
      </button>
    </div>
  </li>
</template>

<style scoped>
.item-tarea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: white;
}

.item-tarea.completada .titulo {
  text-decoration: line-through;
  color: #888;
}

.info-tarea {
  flex: 1;
}

.titulo {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
}

.descripcion {
  margin: 0 0 6px 0;
  color: #666;
  font-size: 0.9rem;
}

.detalles {
  display: flex;
  gap: 8px;
}

.etiqueta {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 3px;
  background-color: #eee;
}

.etiqueta.alta {
  background-color: #ffebee;
  color: #c62828;
}

.etiqueta.media {
  background-color: #fff8e1;
  color: #f57f17;
}

.etiqueta.baja {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  color: white;
}

.btn-ver {
  background-color: #607d8b;
}

.btn-editar {
  background-color: #ff9800;
}

.btn-estado {
  background-color: #2196f3;
}

.btn-eliminar {
  background-color: #e53935;
}
</style>
