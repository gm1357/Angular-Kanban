import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { MenuModule } from '../shared/components/menu/menu.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [ 
        CommonModule,
        MenuModule,
        RouterModule
    ]
})
export class CoreModule { }