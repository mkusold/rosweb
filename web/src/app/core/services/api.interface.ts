interface RosPubSub {
  topic: string;
  msgType: string;
}

export interface CommunicationInterface {
  connection: Connection;
  controller: Controller;
}

interface Connection {
  host: string;
  port: number;
}

interface Controller {
  move: RosPubSub;
}
