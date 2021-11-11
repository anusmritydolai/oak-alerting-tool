import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertingToolComponent } from './alerting-tool/alerting-tool.component';

const routes: Routes = [
  { path: '', component: AlertingToolComponent },
  // { path: '', component: AlertingToolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
