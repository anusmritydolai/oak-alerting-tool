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
    GraphsComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
  exports: [GraphsComponent]
})
export class SharedModule { }
