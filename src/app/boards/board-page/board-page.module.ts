import { NgModule } from '@angular/core';
import { BoardPageComponent } from './board-page.component';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task-list/task/task.component';
import { KcardModule } from 'src/app/shared/components/kcard/kcard.module';
import { TaskFormComponent } from './task-list/task-form/task-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskListFormComponent } from './task-list-form/task-list-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
    declarations: [
        BoardPageComponent,
        TaskListComponent,
        TaskComponent,
        TaskFormComponent,
        TaskListFormComponent
    ],
    exports: [
        BoardPageComponent,
        TaskListComponent,
        TaskComponent
    ],
    imports: [ 
        CommonModule,
        KcardModule,
        ReactiveFormsModule,
        FormsModule,
        DragDropModule,
        MarkdownModule.forRoot(),
    ]
})
export class BoardPageModule { }