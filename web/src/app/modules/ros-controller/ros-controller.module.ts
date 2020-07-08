import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home.page';

import { RosControllerRoutingModule } from './ros-controller-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExamplePageComponent } from './pages/example/example.page';
import { RosControllerComponent } from './ros-controller.component';

@NgModule({
  declarations: [
    RosControllerComponent,
    HomePageComponent,
    ExamplePageComponent,
  ],
  imports: [
    CommonModule,
    RosControllerRoutingModule,
    SharedModule,
  ]
})
export class RosControllerModule { }
