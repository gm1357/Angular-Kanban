import { NgModule } from '@angular/core';
import { BoardsListComponent } from './boards-list.component';
import { CommonModule } from '@angular/common';
import { BoardModule } from '../board/board.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ BoardsListComponent ],
    exports: [ BoardsListComponent ],
    imports: [
        RouterModule,
        CommonModule,
        BoardModule
    ]
})
export class BoardsListModule { }