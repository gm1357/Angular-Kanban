import { NgModule } from '@angular/core';
import { BoardModule } from './board/board.module';
import { BoardsListModule } from './boards-list/boards-list.module';
import { BoardPageModule } from './board-page/board-page.module';

@NgModule({
    imports: [
        BoardModule,
        BoardsListModule,
        BoardPageModule
    ]
})
export class BoardsModule { }