import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginLogoutService } from  '../dashboard/service/loginlogout.service';

@Component({
	selector : 'navbar-cmp',
	moduleId : module.id,
	templateUrl : 'navbar.component.html'
})
export class NavbarComponent {
	constructor(private service : LoginLogoutService, private router : Router){
	}

	isLoggedIn():boolean {
		//console.log(this.service.isLoggedIn());
		return this.service.isLoggedIn();
	}
	logout() {
			this.router.navigateByUrl('login');
	}
}