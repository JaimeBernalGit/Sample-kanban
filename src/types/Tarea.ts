export type Prioridad = 'Alta' | 'Media' | 'Baja'
export type Estado = 'Pendiente' | 'En Progreso' | 'Completado' | 'Cancelado'

export interface Tarea {
  id: string
  titulo: string
  prioridad: Prioridad
  estado: Estado
  descripcion?: string
  horasEstimadas: number | null
}
