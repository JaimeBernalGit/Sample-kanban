import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Tarea, Estado } from '../types/Tarea'

const STORAGE_KEY = 'kanban-tareas'

function cargarTareas(): Tarea[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Tarea[]
  } catch {
    return []
  }
}

const siguienteEstado: Partial<Record<Estado, Estado>> = {
  Pendiente: 'En Progreso',
  'En Progreso': 'Completado'
}

export const useTareasStore = defineStore('tareas', () => {
  const tareas = ref<Tarea[]>(cargarTareas())

  watch(
    tareas,
    (valor) => localStorage.setItem(STORAGE_KEY, JSON.stringify(valor)),
    { deep: true }
  )

  const pendientes = computed<Tarea[]>(() => tareas.value.filter(t => t.estado === 'Pendiente'))
  const enProgreso = computed<Tarea[]>(() => tareas.value.filter(t => t.estado === 'En Progreso'))
  const completadas = computed<Tarea[]>(() => tareas.value.filter(t => t.estado === 'Completado'))

  function agregarTarea(tarea: Tarea): void {
    tareas.value.push(tarea)
  }

  function avanzarTarea(id: string): void {
    const tarea = tareas.value.find(t => t.id === id)
    if (!tarea) return
    const siguiente = siguienteEstado[tarea.estado]
    if (siguiente) tarea.estado = siguiente
  }

  function eliminarTarea(id: string): void {
    tareas.value = tareas.value.filter(t => t.id !== id)
  }

  return { tareas, pendientes, enProgreso, completadas, agregarTarea, avanzarTarea, eliminarTarea }
})
