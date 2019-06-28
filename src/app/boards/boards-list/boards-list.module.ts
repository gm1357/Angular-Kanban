import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BoardsListComponent } from './boards-list.component';
import { CommonModule } from '@angular/common';
import { BoardModule } from '../board/board.module';
import { RouterModule } from '@angular/router';
import { BoardFormModule } from './board-form/board-form.module';

@NgModule({
    declarations: [ BoardsListComponent ],
    exports: [ BoardsListComponent ],
    imports: [
        RouterModule,
        CommonModule,
        BoardModule,
        ReactiveFormsModule,
        FormsModule,
        BoardFormModule
    ]
})
export class BoardsListModule { }