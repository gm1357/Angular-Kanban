import { NgModule } from '@angular/core';
import { BoardPageComponent } from './board-page.component';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';

@NgModule({
    declarations: [
        BoardPageComponent,
        TaskListComponent,
        TaskComponent
    ],
    exports: [
        BoardPageComponent,
        TaskListComponent,
        TaskComponent
    ],
    imports: [ CommonModule ]
})
export class BoardPageModule { }