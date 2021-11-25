import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AlertingToolComponent } from './alerting-tool/alerting-tool.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AlertingToolComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    HttpClientModule
  ],
  providers: [ ApiService ]
})
export class PagesModule { }
