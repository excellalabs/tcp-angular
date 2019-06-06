import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataDisplayComponent } from './data-display/data-display.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AppComponent,
    DataDisplayComponent,
    EmployeeFormComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
