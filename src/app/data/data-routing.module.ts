import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeepDiveAnalyticsComponent } from './deep-dive-analytics/deep-dive-analytics.component';

const routes: Routes = [
  { path: '', component: DeepDiveAnalyticsComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
