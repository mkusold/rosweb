export interface AppState {
  connected: Connectivity;
  pose: Pose;
}

export enum Connectivity {
  Connected = 0,
  Connecting = 1,
  Disconnected = 2
}

export interface Pose {
  x: number;
  y: number;
  theta: number;
  linearVelocity: number;
  angularVelocity: number;
}
