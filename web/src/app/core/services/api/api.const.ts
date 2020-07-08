import { CommunicationInterface } from './api.interface';
import { environment } from 'src/environments/environment';

const ROS_MSG_TYPES = {
  // primitives
  Boolean: 'std_msgs/Bool',
  String: 'std_msgs/String',
  // geometry
  Twist: 'geometry_msgs/Twist',
  // custom
  Pose: 'turtlesim/Pose',
};

export const COMMUNICATION_INTERFACE: CommunicationInterface = {
  connection: {
    host: environment.server.host,
    port: environment.server.port,
  },
  controller: {
    move: {
      topic: '/turtle1/cmd_vel',
      msgType: ROS_MSG_TYPES.Twist,
    }
  },
  telemetry: {
    pose: {
      topic: '/turtle1/pose',
      msgType: ROS_MSG_TYPES.Pose,
    }
  }
};

export enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
}
