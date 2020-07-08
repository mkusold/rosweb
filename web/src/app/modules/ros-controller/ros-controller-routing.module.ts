import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.page';
import { ExamplePageComponent } from './pages/example/example.page';
import { RosControllerComponent } from './ros-controller.component';

const routes: Routes = [
  {
    path: 'ros-controller',
    component: RosControllerComponent,

    children: [
      { path: '',   redirectTo: '/ros-controller/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'example', component: ExamplePageComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RosControllerRoutingModule { }
