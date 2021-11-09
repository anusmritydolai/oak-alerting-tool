import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { highchartsModules } from '../shared/shared.module';

@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    ChartModule,
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],

})
export class DataModule { }
