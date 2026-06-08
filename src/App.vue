<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Tarea, Estado } from './types/Tarea'
import KanbanColumn from './components/KanbanColumn.vue'
import TaskFormDialog from './components/TaskFormDialog.vue'

const STORAGE_KEY = 'kanban-tareas'

function cargarTareas(): Tarea[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Tarea[]
  } catch {
    return []
  }
}

const tareas = ref<Tarea[]>(cargarTareas())

watch(
  tareas,
  (valor) => localStorage.setItem(STORAGE_KEY, JSON.stringify(valor)),
  { deep: true }
)

const pendientes = computed<Tarea[]>(() => tareas.value.filter(t => t.estado === 'Pendiente'))
const enProgreso = computed<Tarea[]>(() => tareas.value.filter(t => t.estado === 'En Progreso'))
const completadas = computed<Tarea[]>(() => tareas.value.filter(t => t.estado === 'Completado'))

const dialogAbierto = ref<boolean>(false)

const siguienteEstado: Partial<Record<Estado, Estado>> = {
  Pendiente: 'En Progreso',
  'En Progreso': 'Completado'
}

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
</script>

<template>
  <v-app>
    <v-app-bar color="deep-purple-darken-2" elevation="3">
      <v-app-bar-title class="text-white font-weight-bold">
        Kanban Board
      </v-app-bar-title>
      <template #append>
        <v-btn
          prepend-icon="mdi-plus-circle"
          variant="tonal"
          color="white"
          class="mr-3"
          @click="dialogAbierto = true"
        >
          Nueva Tarea
        </v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="12" md="4">
            <kanban-column
              titulo="Pendiente"
              color="blue-grey-darken-1"
              :tareas="pendientes"
              @avanzar="avanzarTarea"
              @eliminar="eliminarTarea"
            />
          </v-col>
          <v-col cols="12" md="4">
            <kanban-column
              titulo="En Progreso"
              color="orange-darken-2"
              :tareas="enProgreso"
              @avanzar="avanzarTarea"
              @eliminar="eliminarTarea"
            />
          </v-col>
          <v-col cols="12" md="4">
            <kanban-column
              titulo="Completado"
              color="green-darken-2"
              :tareas="completadas"
              @avanzar="avanzarTarea"
              @eliminar="eliminarTarea"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialogAbierto" max-width="480" persistent>
      <task-form-dialog
        v-if="dialogAbierto"
        @guardar="agregarTarea"
        @cerrar="dialogAbierto = false"
      />
    </v-dialog>
  </v-app>
</template>
