const URL_BASE = 'http://localhost:3000/api/tareas'

export async function obtenerTareas(señal) {
  const respuesta = await fetch(URL_BASE, { signal: señal })
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.mensaje || 'Error al obtener las tareas')
  }
  const resultado = await respuesta.json()
  return resultado.datos
}

export async function obtenerTareaPorId(id, señal) {
  const respuesta = await fetch(`${URL_BASE}/${id}`, { signal: señal })
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.mensaje || 'Error al obtener la tarea')
  }
  const resultado = await respuesta.json()
  return resultado.datos
}

export async function crearTarea(datos) {
  const respuesta = await fetch(URL_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.mensaje || 'Error al crear la tarea')
  }
  return await respuesta.json()
}

export async function actualizarTarea(id, datos) {
  const respuesta = await fetch(`${URL_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.mensaje || 'Error al actualizar la tarea')
  }
  return await respuesta.json()
}

export async function eliminarTarea(id) {
  const respuesta = await fetch(`${URL_BASE}/${id}`, {
    method: 'DELETE'
  })
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.mensaje || 'Error al eliminar la tarea')
  }
  return await respuesta.json()
}
