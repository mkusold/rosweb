import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';
import { Unsubscribable } from 'rxjs';

import { COMMUNICATION_INTERFACE, Direction, } from './api.const';
import { Connectivity } from '../state/appState.interface';
import { AppStateService } from '../state/appState.service';
import { AppStateQuery } from '../state/appState.query';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private client;
  private retries = 0;
  private retryMax = 60 * 10; // 10 minutes
  private connectionUrl: string;

  // =======================================
  // DECLARE SUBSCRIPTIONS HERE
  // =======================================
  private poseSubscription: Unsubscribable;

  constructor(
    private appState: AppStateService,
    private query: AppStateQuery
    ) {
    const {connection: {host, port}} = COMMUNICATION_INTERFACE;
    this.connectionUrl = `${host}:${port}`;
    this.connect();
  }

  connect() {
    const isConnected = this.query.getConnection();
    if (isConnected === Connectivity.Disconnected) {
      this.createClient();
    }
  }

  retry() {
    console.log(`Can not connect to ROS. Retrying ${this.retries} of ${this.retryMax} times`);
    if (this.retries < this.retryMax) {
      setTimeout(this.createClient.bind(this), 1000);
    }
  }

  createClient() {
    this.retries++;
    this.appState.updateConnection(Connectivity.Connecting);
    this.client = new ROSLIB.Ros({url : this.connectionUrl});
    this.client.on('connection', () =>  {
      this.retries = 0;
      this.appState.updateConnection(Connectivity.Connected);
      console.log('Connected to the ROS websocket server.');
      // ===============================================================
      // SUBSCRIBE TO ONGOING SUBSCRIPTIONS HERE AFTER CONNECTION OCCURS
      // ===============================================================
      this.poseSubscription = this.subscribeToTurtlePose();
    });
    this.client.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
    });

    this.client.on('close', () => {
      if (!this.retries || this.retries === this.retryMax) {
        this.appState.updateConnection(Connectivity.Disconnected);
      }
      console.log('Connection to the ROS websocket server closed.');
      this.retry();
    });
  }

  shutDown(): void {
    // =============================================================
    // UNSUBSCRIBE TO ONGOING SUBSCRIPTIONS TO CLEAN UP CONNECTIONS
    // =============================================================
    this.poseSubscription.unsubscribe();
  }

  createRosConnection({topic, msgType}) {
    const connection = new ROSLIB.Topic({
      ros : this.client,
      name : topic,
      messageType : msgType
    });
    return connection;
  }

  // ====================================
  // THIS IS AN EXAMPLE OF A SUBSCRIPTION
  // ====================================
  subscribeToTurtlePose(): Unsubscribable {
    const poseTopicInfo =  {
      topic: '/turtle1/pose',
      msgType: 'turtlesim/Pose',
    };

    const poseListener = this.createRosConnection(poseTopicInfo);
    // these fields such as 'linear_velocity' match up with the ROS message declaration
    poseListener.subscribe(({x, y, theta, linear_velocity, angular_velocity }) => {
      this.appState.updatePose({
        x,
        y,
        theta,
        linearVelocity: linear_velocity,
        angularVelocity: angular_velocity
      });
    });
    return poseListener;
  }

  private createVelocityMessage(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return {
          linear: {
            x: 2,
            y: 0,
            z: 0,
          },
          angular: {
            x: 0,
            y: 0,
            z: 0,
          },
        };
      case Direction.Down:
        return {
          linear: {
            x: -2,
            y: 0,
            z: 0,
          },
          angular: {
            x: 0,
            y: 0,
            z: 0,
          },
        };
      case Direction.Right:
        return {
          linear: {
            x: 0,
            y: 0,
            z: 0,
          },
          angular: {
            x: 0,
            y: 0,
            z: -2,
          },
        };
      case Direction.Left:
        return {
          linear: {
            x: 0,
            y: 0,
            z: 0,
          },
          angular: {
            x: 0,
            y: 0,
            z: 2,
          },
        };
      default:
        return {
          x: 0,
          y: 0,
          z: 0,
        };
    }
  }

  // ====================================
  // THIS IS AN EXAMPLE OF A PUBLISHER
  // ====================================
  sendMovementCommand(direction: Direction): void {
    const moveTopicInfo = {
      topic: '/turtle1/cmd_vel',
      msgType: 'geometry_msgs/Twist',
    };
    const commandPublisher = this.createRosConnection(moveTopicInfo);

    const message = new ROSLIB.Message(this.createVelocityMessage(direction));

    commandPublisher.publish(message);
  }
}
