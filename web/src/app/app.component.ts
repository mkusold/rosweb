import { Component, OnDestroy } from '@angular/core';
import { AppStateQuery } from './core/services/state/appState.query';
import { ApiService } from './core/services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(
    private appStateQuery: AppStateQuery,
    private api: ApiService
  ) {
    this.api.connect();
  }

  ngOnDestroy(): void {
    // unsubscribes to always on api service subscriptions
    this.api.shutDown();
  }
}
