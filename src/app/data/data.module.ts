import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { highchartsModules, SharedModule } from '../shared/shared.module';
import { DeepDiveAnalyticsComponent } from './deep-dive-analytics/deep-dive-analytics.component';

@NgModule({
  declarations: [DeepDiveAnalyticsComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    ChartModule,
    SharedModule
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],

})
export class DataModule { }
