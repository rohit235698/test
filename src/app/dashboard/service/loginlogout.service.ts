import { Injectable } from '@angular/core';
import { Http ,Headers ,RequestOptions ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginLogoutService {
	 private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
     private options = new RequestOptions({ headers: this.headers });
     private token : string;
	constructor(private http : Http){

	}
	signup(user) : Observable<any>{
		return this.http.post('/action/signup', JSON.stringify(user), this.options)
																.map((res) =>res.json()
																);


	}
	isNameAvailable(name) : Observable<any> {
		let params = new URLSearchParams();
		params.set('name',name);
		return this.http.get('/action/signup/validname', { 
													search : params
													}).map((res)=>res.json());
	}

	invalidateUser() {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
	}

	login(user) : Observable<any> {		
        return this.http.post('/action/login', JSON.stringify(user), this.options)
																.map(this.extractUser);
	}
	extractUser(res) {
		res = res.json();
		//console.log(res);
		this.token=res.username && res.jwt;
		if(this.token){
			localStorage.setItem('token',this.token);
			localStorage.setItem('name',res.username);
		}

		return res;
		
	}
	isLoggedIn() {
			let token = localStorage.getItem('name') && localStorage.getItem('token');
			console.log(token);
				if(token){
					this.token = token;
					return true;
				}
				else{
					return false;
				}
}



}