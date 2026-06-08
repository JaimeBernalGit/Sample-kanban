<script setup lang="ts">
import type { Tarea } from '../types/Tarea'

const props = defineProps<{ tarea: Tarea }>()
const emit = defineEmits<{
  avanzar: [id: string]
  eliminar: [id: string]
}>()

const colorPrioridad: Record<string, string> = {
  Alta: 'error',
  Media: 'warning',
  Baja: 'grey'
}
</script>

<template>
  <v-card class="mb-3" elevation="2" rounded="lg">
    <v-card-text class="pb-1">
      <div class="d-flex align-center justify-space-between">
        <span class="text-body-1 font-weight-medium">{{ props.tarea.titulo }}</span>
        <v-chip
          :color="colorPrioridad[props.tarea.prioridad]"
          size="small"
          variant="flat"
          class="ml-2 flex-shrink-0"
        >
          {{ props.tarea.prioridad }}
        </v-chip>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn
        v-if="props.tarea.estado !== 'Completado'"
        icon="mdi-arrow-right-circle-outline"
        size="small"
        variant="text"
        color="primary"
        title="Mover a la siguiente columna"
        @click="emit('avanzar', props.tarea.id)"
      />
      <v-spacer />
      <v-btn
        icon="mdi-delete-outline"
        size="small"
        variant="text"
        color="error"
        title="Eliminar tarea"
        @click="emit('eliminar', props.tarea.id)"
      />
    </v-card-actions>
  </v-card>
</template>
