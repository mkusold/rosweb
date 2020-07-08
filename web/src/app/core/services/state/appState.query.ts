import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { AppState, Connectivity, Pose } from './appState.interface';
import { AppStore } from './app.store';

/**
 * A Query is a class offering functionality responsible for querying the store.
 *
 * You can think of the query as being similar to database queries.
 * Its constructor function receives as parameters its own store and possibly other query classes.
 *
 * Queries can talk to other queries, join entities from different stores, etc.
 *
 * See documentation here:
 * https://netbasal.gitbook.io/akita/core-concepts/the-query
 */
@Injectable({ providedIn: 'root' })
export class AppStateQuery extends Query<AppState> {

  constructor(protected store: AppStore) {
    super(store);
  }

  getConnection(): Connectivity {
    return this.getValue().connected;
  }

  getPose(): Pose {
    return this.getValue().pose;
  }
}
