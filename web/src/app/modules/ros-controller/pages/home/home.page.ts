import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Direction } from 'src/app/core/services/api/api.const';
import { AppStateQuery } from 'src/app/core/services/state/appState.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent implements OnInit {

  poseSubscription: Subscription;
  speed: number;
  angle: number;

  constructor(
    private api: ApiService,
    private appStateQuery: AppStateQuery,
  ) { }

  ngOnInit(): void {
    this.poseSubscription = this.appStateQuery.select(state => state.pose).subscribe(pose => {
      this.speed = pose.linearVelocity;
      // TODO: assign local 'angle' variable with subscription value
   });
 }

  onUpCommand() {
    this.api.sendMovementCommand(Direction.Up);
  }

  // TODO: ADD DOWN COMMAND
}
