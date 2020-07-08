import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Connectivity } from './appState.interface';

/**
 * The Store is a single object which contains the store state and serves as the "single source of truth."
 * To create a store, you need to extend Akita's Store, passing the type as well as its initial state.
 *
 * See documentation here:
 *  https://netbasal.gitbook.io/akita/core-concepts/store
 */
export function createInitialState(): any {
  return {
    connected: Connectivity.Disconnected,
    pose: {
      x: 0,
      y: 0,
      theta: 0,
      linearVelocity: 0,
      angularVelocity: 0
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'appState' })
export class AppStore extends Store<any> {
  constructor() {
    super(createInitialState());
  }
}
