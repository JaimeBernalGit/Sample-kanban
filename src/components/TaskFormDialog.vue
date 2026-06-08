<script setup lang="ts">
import { ref } from 'vue'
import type { Tarea, Prioridad } from '../types/Tarea'

const emit = defineEmits<{
  guardar: [tarea: Tarea]
  cerrar: []
}>()

const titulo = ref<string>('')
const prioridad = ref<Prioridad>('Media')
const prioridades: Prioridad[] = ['Alta', 'Media', 'Baja']

function guardar(): void {
  if (!titulo.value.trim()) return
  const tarea: Tarea = {
    id: crypto.randomUUID(),
    titulo: titulo.value.trim(),
    prioridad: prioridad.value,
    estado: 'Pendiente'
  }
  emit('guardar', tarea)
  emit('cerrar')
}
</script>

<template>
  <v-card min-width="400">
    <v-card-title class="text-h6 pa-4">Nueva Tarea</v-card-title>
    <v-divider />
    <v-card-text class="pa-4">
      <v-text-field
        v-model="titulo"
        label="Título de la tarea"
        variant="outlined"
        autofocus
        class="mb-2"
        @keyup.enter="guardar"
      />
      <v-select
        v-model="prioridad"
        :items="prioridades"
        label="Prioridad"
        variant="outlined"
      />
    </v-card-text>
    <v-divider />
    <v-card-actions class="pa-4">
      <v-spacer />
      <v-btn variant="text" @click="emit('cerrar')">Cancelar</v-btn>
      <v-btn
        color="primary"
        variant="flat"
        :disabled="!titulo.trim()"
        @click="guardar"
      >
        Crear Tarea
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
