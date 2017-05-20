import {Component, AfterViewChecked, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { LoginLogoutService } from '../service/loginlogout.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


declare var componentHandler: any;
declare var jquery : any;

@Component({
    selector: 'signup-cmp',
    moduleId: module.id,
    templateUrl: 'signup.component.html'
})

export class SignupComponent implements AfterViewChecked {
	user  = new User('','','','','');
   	isInvalid = false;
    takenName = false;
    spin = false;
    usernamechanged: Subject<string> = new Subject<string>();
    constructor(private service : LoginLogoutService, private router : Router){
         this.usernamechanged
            .debounceTime(300) // wait 300ms after the last event before emitting last event
            .distinctUntilChanged() // only emit if value is different from previous value
            .subscribe(name => this.service.isNameAvailable(name).subscribe((name)=>{
                                                                                   this.takenName = !name.isValid;
                                                                                       }));
	}
 
    ngAfterViewChecked(){
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
        if(this.user.passagain.length < this.user.password.length ||
                             this.user.passagain == this.user.password ){

                this.isInvalid = false;
        }
        else {
                this.isInvalid = true;
        }
        this.usernamechanged.next(this.user.username);
    }

    onSubmit() {
    	console.log(this.user);
        this.spin=true;
    	this.service.signup(this.user).subscribe((user)=>{
                this.spin=false;
    	    	this.router.navigateByUrl('login');
    	});


    }

}
export class User {
    constructor( public name: string,
	    public username : string,
	    public email: string,
	    public password : string,
	    public passagain : string) {

}
}

