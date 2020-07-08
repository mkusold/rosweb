import { CommunicationInterface } from './api.interface';
import { environment } from 'src/environments/environment';

export const COMMUNICATION_INTERFACE: CommunicationInterface = {
  connection: {
    host: environment.server.host,
    port: environment.server.port,
  }
};

export enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
}
