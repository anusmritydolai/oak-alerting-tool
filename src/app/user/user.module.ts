import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule, BsDaterangepickerDirective, DatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    // BsDaterangepickerM
  ]
})
export class UserModule { }
