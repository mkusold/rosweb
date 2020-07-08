import { Injectable } from '@angular/core';

import { AppStore } from './app.store';
import { Connectivity, Pose } from './appState.interface';

/**
 * Akita recommends using a service rather than call the store methods directly by a component.
 *
 * See documentation here:
 * https://netbasal.gitbook.io/akita/core-concepts/the-service
 */
@Injectable({ providedIn: 'root' })
export class AppStateService {
  constructor(private store: AppStore) {}

  updateConnection(status: Connectivity) {
    this.store.update(state => ({
      ...state,
      connected: status
    }));
  }

  updatePose(pose: Pose) {
    this.store.update(state => ({
      ...state,
      pose
    }));
  }
}
