import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';


@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        CommonModule,FormsModule
    ],
    declarations: [ MODULE_COMPONENTS ],
    exports : [ DashboardComponent ],
    providers: []
})

export class DashboardModule {}
