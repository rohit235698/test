import { Component, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { LoginLogoutService } from '../service/loginlogout.service';
import { DashBoardService } from '../service/dashboard.service';

declare var componentHandler: any;
@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements AfterViewChecked{
	user ={
		name : '',
		pass : ''
	}
	spin :boolean =false;
	message : string ='';
	constructor(private service : LoginLogoutService,private router : Router,private dashboardService :DashBoardService){
		service.invalidateUser();
	}


   ngAfterViewChecked(){
         if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }
    login(){
    	this.spin = true;
    	this.service.login(this.user).subscribe((user)=>{
    		if(user.username){
    			this.dashboardService.setUser(user);
    			this.spin =false;
				this.router.navigateByUrl('home');
				}
			else if(user.message){
				this.message = user.message;
			}
			this.spin = false;
    	})
    }
}
