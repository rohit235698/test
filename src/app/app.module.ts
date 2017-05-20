import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './dashboard/login/login.component';
import { SignupComponent } from './dashboard/signup/signup.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent , LoginComponent, SignupComponent
  ],
  imports: [
    SidebarModule,
    NavbarModule,
    DashboardModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([ ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
