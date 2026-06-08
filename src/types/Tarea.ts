export type Prioridad = 'Alta' | 'Media' | 'Baja'
export type Estado = 'Pendiente' | 'En Progreso' | 'Completado'

export interface Tarea {
  id: string
  titulo: string
  prioridad: Prioridad
  estado: Estado
  horasEstimadas: number | null
}
