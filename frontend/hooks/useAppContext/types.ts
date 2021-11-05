export interface State {
  id: number | null;
}

export type ContextHook = () => State;
