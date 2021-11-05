import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../shared/shared.module';
// import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    LoginComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
