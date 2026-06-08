<script setup lang="ts">
import type { Tarea } from '../types/Tarea'
import TaskCard from './TaskCard.vue'

defineProps<{
  titulo: string
  tareas: Tarea[]
  color: string
}>()

const emit = defineEmits<{
  avanzar: [id: string]
  eliminar: [id: string]
}>()
</script>

<template>
  <v-card variant="outlined" rounded="lg" height="100%">
    <v-sheet :color="color" class="pa-3 rounded-t-lg d-flex align-center justify-space-between">
      <span class="text-white text-h6 font-weight-bold">{{ titulo }}</span>
      <v-chip color="white" size="small" variant="flat">{{ tareas.length }}</v-chip>
    </v-sheet>
    <v-card-text class="pa-3">
      <task-card
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @avanzar="emit('avanzar', $event)"
        @eliminar="emit('eliminar', $event)"
      />
      <div v-if="tareas.length === 0" class="text-center text-medium-emphasis py-8">
        <v-icon icon="mdi-inbox-outline" size="40" class="mb-2 d-block mx-auto" />
        <span>Sin tareas</span>
      </div>
    </v-card-text>
  </v-card>
</template>
