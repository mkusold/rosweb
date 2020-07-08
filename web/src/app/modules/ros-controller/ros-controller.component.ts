import { Component, OnInit } from '@angular/core';
import { Connectivity } from 'src/app/core/services/state/appState.interface';
import { Observable } from 'rxjs';
import { AppStateQuery } from 'src/app/core/services/state/appState.query';

@Component({
  selector: 'app-ros-controller',
  templateUrl: './ros-controller.component.html',
  styleUrls: ['./ros-controller.component.scss']
})
export class RosControllerComponent implements OnInit {

  ConnectivityType = Connectivity;
  connected$: Observable<Connectivity>;

  constructor(private appStateQuery: AppStateQuery) { }

  ngOnInit(): void {
    this.connected$ = this.appStateQuery.select(state => state.connected);
  }

}
