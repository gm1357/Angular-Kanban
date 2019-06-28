import { NgModule } from '@angular/core';
import { BoardFormComponent } from './board-form.component';
import { CommonModule } from '@angular/common';
import { BoardModule } from '../../board/board.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ BoardFormComponent ],
    exports: [ BoardFormComponent ],
    imports: [
        CommonModule,
        BoardModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class BoardFormModule { }