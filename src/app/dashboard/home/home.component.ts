import { Component, AfterViewChecked, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from '../service/dashboard.service';
import { PagerService } from '../service/pager.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject }  from 'rxjs/Subject';
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

declare var componentHandler: any;
@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements AfterViewChecked ,OnInit{

matches :any[]=[];
loggedin : boolean = false;
paggedmatches : any[] =[];
pager: any = {};
match : any ={};
asc : boolean = true;
filtermatches : Observable<any[]>;
private searchMatches = new Subject<string>();

	constructor(private _service : DashBoardService,private router : Router,private pagerService : PagerService){
		this.loggedin=_service.isLoggedIn();
		if(!this.loggedin)
			router.navigateByUrl('login');
		else
			_service.getAllMatches().subscribe((matches)=>{
				//_service.pagematches(matches,0)
				_service.setMatches(matches);
				this.matches=matches;
				 this.setPage(1);
				
			})
	}
      ngAfterViewChecked (){
         if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }      
    }
      ngOnInit() {
    this.filtermatches=this.searchMatches
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
      	if(!term)
      		return Observable.of<any []>([]);

      	let matches=this._service.getMatches();
      	matches=matches.filter((match)=>{
      		term=term.toLowerCase();
      		return match.team1.toLowerCase().startsWith(term) || match.team2.toLowerCase().startsWith(term);
      	});
      	matches=matches.slice(0,9);
      	return Observable.of(matches);
       });
  }

      setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.matches.length, page);
        // get current page of items
        this.paggedmatches = this.matches.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
      selectmatch(match){
    	console.log(match);
    	this._service.selectedMatch(match);
    	this.router.navigateByUrl('')
    }
 	  autoMatches(){
 	  	this.searchMatches.next(this.match.name);
 	  }   
 	  selectmatchsuggestion(match){
 	  	this.match.name = match.team1+' VS '+match.team2;
 	  	this.searchMatches.next(this.match.name);
 	  	this.matches = this._service.getMatches()
 	  	this.matches=this.matches.filter((matchitem)=>{
 	  		if(matchitem.team1.startsWith(match.team1) && matchitem.team2.startsWith(match.team2)) {
 	  			return true;
 	  		}
 	  		if(matchitem.team1.startsWith(match.team2) && matchitem.team2.startsWith(match.team1)) {
 	  			return true;
 	  		}
 	  		return false;
 	  	})
 	  	this.setPage(1);
 	  }
 	  sort(field){
 	  	//console.log('iygavbfua');
 	  	this.matches =this.matches.sort((a,b)=>{

 	  		if(a[field] < b[field])
		 	  	return !this.asc ? -1 : 1;
		 	else if(a[field] > b[field])
		 	  	return !this.asc ?  1 : -1;
		 	return 0;
 	  	})
 	  	this.setPage(1);
 	  	this.asc=!this.asc; 
 	  }
}
