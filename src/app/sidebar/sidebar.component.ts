import { Component ,OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';

@Component({
  selector: 'sidebar-cmp',
  templateUrl: './sidebar.component.html'
})
//declare var componentHandler: any;
export class SidebarComponent implements OnInit {
menuItems : any[];  
     ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
     
}
