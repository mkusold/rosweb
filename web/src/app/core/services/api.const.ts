import { CommunicationInterface } from './api.interface';
import { environment } from 'src/environments/environment';

const ROS_MSG_TYPES = {
  // primitives
  Boolean: 'std_msgs/Bool',
  String: 'std_msgs/String',
  // geometry
  Twist: 'geometry_msgs/Twist'
};

export const COMMUNICATION_INTERFACE: CommunicationInterface = {
  connection: {
    host: environment.server.host,
    port: environment.server.port,
  },
  controller: {
    move: {
      topic: '/turtle1/cmd_vel',
      msgType: ROS_MSG_TYPES.Twist
    }
  },
};
