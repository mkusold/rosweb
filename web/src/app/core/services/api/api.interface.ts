interface RosPubSub {
  topic: string;
  msgType: string;
}

export interface CommunicationInterface {
  connection: Connection;
}

interface Connection {
  host: string;
  port: number;
}
