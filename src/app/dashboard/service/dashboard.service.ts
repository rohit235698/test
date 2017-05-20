import { Injectable } from '@angular/core';
import { Http ,Headers ,RequestOptions ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashBoardService{
private token : string;
private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' ,'authorization': '' });
private options = new RequestOptions({ headers: this.headers });
matches : any[] =[];
match : any ={};

constructor(private http:Http){
}
user : string; 
allornot : boolean = false;
setUser(user){
this.user = user;
}

getAllMatches(): Observable<any[]> {
this.options.headers.set('authorization',this.token);
return this.http.get('/action/getmatches',this.options).map(this.extractMatches);
}

extractMatches(res){
	res = res.json() || res;
	return res;
}
isLoggedIn() {
let token = localStorage.getItem('name') && localStorage.getItem('token');
	if(token){
		this.token = token;
		return true;
	}
	else{
		return false;
	}
}
getMatches(){
	return this.matches;
}
setMatches(matches){
	this.matches= matches;
}
selectedMatch(match){
this.match =match;
}
}