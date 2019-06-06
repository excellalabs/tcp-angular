import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DataDisplayComponent } from './data-display/data-display.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MaterialModule } from './material.module';
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
    MainNavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
