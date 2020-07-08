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

  DirectionType: typeof Direction = Direction;
  poseSubscription: Subscription;
  speed: number;

  constructor(
    private api: ApiService,
    private appStateQuery: AppStateQuery,
  ) { }

  ngOnInit(): void {
    this.poseSubscription = this.appStateQuery.select(state => state.pose.linearVelocity).subscribe(speed => {
      this.speed = speed;
   });
 }

  onDirectionComand(direction: Direction) {
    this.api.sendMovementCommand(direction);
  }

}
