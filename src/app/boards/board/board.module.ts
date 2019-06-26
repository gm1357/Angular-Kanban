import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';
import { KcardModule } from 'src/app/shared/components/kcard/kcard.module';

@NgModule({
    declarations: [ BoardComponent ],
    exports: [ BoardComponent ],
    imports: [ 
        CommonModule,
        KcardModule
    ]
})
export class BoardModule { }