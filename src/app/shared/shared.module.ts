import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs/graphs.component';
import { HIGHCHARTS_MODULES, ChartModule } from 'angular-highcharts';

import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';
import highmaps from 'highcharts/modules/map.src';
import solidgauge from 'highcharts/modules/solid-gauge.src';
import treemap from 'highcharts/modules/treemap.src';
import accessibility from 'highcharts/modules/accessibility.src';
import exportdata from 'highcharts/modules/export-data.src';
import stock from 'highcharts/modules/stock.src';

import { HeaderComponent } from './header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgsAvaterModule } from 'ngs-avater';
import { LineGraphComponent } from './line-graph/line-graph.component';


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [
    more,
    exporting,
    highmaps,
    solidgauge,
    accessibility,
    exportdata,
    stock,
    treemap
  ];
}

@NgModule({
  declarations: [
    GraphsComponent,
    HeaderComponent,
    LineGraphComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
    BsDatepickerModule,
    BsDropdownModule.forRoot(),
    NgsAvaterModule,
  ],
  exports: [
    GraphsComponent, 
    HeaderComponent,
    LineGraphComponent
  ],
    

  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
})
export class SharedModule { }
