<script setup lang="ts">
import { ref } from 'vue'
import KanbanColumn from './components/KanbanColumn.vue'
import TaskFormDialog from './components/TaskFormDialog.vue'
import { useTareasStore } from './stores/tareas'

const store = useTareasStore()
const dialogAbierto = ref<boolean>(false)
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
              :tareas="store.pendientes"
              @avanzar="store.avanzarTarea"
              @eliminar="store.eliminarTarea"
              @cancelar="store.cancelarTarea"
            />
          </v-col>
          <v-col cols="12" md="4">
            <kanban-column
              titulo="En Progreso"
              color="orange-darken-2"
              :tareas="store.enProgreso"
              @avanzar="store.avanzarTarea"
              @eliminar="store.eliminarTarea"
              @cancelar="store.cancelarTarea"
            />
          </v-col>
          <v-col cols="12" md="4">
            <kanban-column
              titulo="Completado"
              color="green-darken-2"
              :tareas="store.completadas"
              @avanzar="store.avanzarTarea"
              @eliminar="store.eliminarTarea"
              @cancelar="store.cancelarTarea"
            />
          </v-col>
          <v-col cols="12" md="4">
            <kanban-column
              titulo="Cancelado"
              color="red-darken-2"
              :tareas="store.canceladas"
              @avanzar="store.avanzarTarea"
              @eliminar="store.eliminarTarea"
              @cancelar="store.cancelarTarea"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialogAbierto" max-width="480" persistent>
      <task-form-dialog
        v-if="dialogAbierto"
        @guardar="store.agregarTarea"
        @cerrar="dialogAbierto = false"
      />
    </v-dialog>
  </v-app>
</template>
