import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { KcardModule } from '../shared/components/kcard/kcard.module';
import { BoardsModule } from '../boards/boards.module';
import { BoardsListModule } from '../boards/boards-list/boards-list.module';

@NgModule({
    declarations: [ HomeComponent ],
    exports: [ HomeComponent ],
    imports: [
        CommonModule,
        BoardsListModule
    ]
})
export class HomeModule { }