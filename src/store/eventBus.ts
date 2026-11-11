// src/store/eventBus.ts

export type DiscipleshipEvent =
  | "leccion_iniciada"
  | "leccion_recorrida"
  | "leccion_reabierta"
  | "nivel_desbloqueado"
  | "nivel_recorrido"
  | "senda_recorrida"
  | "posicion_guardada"
  | "check_respondido"
  | "check_reintentado"
  | "partida_iniciada"
  | "partida_finalizada";

type EventListener = (event: DiscipleshipEvent, payload: any) => void;

class EventBus {
  private listeners: Set<EventListener> = new Set();

  on(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event: DiscipleshipEvent, payload?: any): void {
    this.listeners.forEach((listener) => {
      try {
        listener(event, payload);
      } catch (e) {
        console.error(`[EventBus] Error en listener para ${event}:`, e);
      }
    });
  }
}

export const eventBus = new EventBus();
