import { NgModule } from '@angular/core';
import { KcardComponent } from './kcard.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [  KcardComponent ],
    exports: [ KcardComponent ],
    imports: [ CommonModule ]
})
export class KcardModule { }