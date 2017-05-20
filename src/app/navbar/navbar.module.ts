import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../dashboard/login/login.component';
import { SignupComponent } from '../dashboard/signup/signup.component';
import { LoginLogoutService } from  '../dashboard/service/loginlogout.service';
import { DashBoardService } from '../dashboard/service/dashboard.service';
import { PagerService } from '../dashboard/service/pager.service';

@NgModule({

	declarations :[ NavbarComponent ],
	imports : [  FormsModule,
	RouterModule.forChild([ { path: 'login' , component: LoginComponent },
    						{ path: 'signup' , component: SignupComponent }
						]),CommonModule
	],
	exports : [ NavbarComponent ],
	providers : [ LoginLogoutService ,DashBoardService, PagerService]
})

export class NavbarModule {

}