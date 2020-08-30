import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kcard',
  templateUrl: './kcard.component.html',
  styleUrls: ['./kcard.component.css']
})
export class KcardComponent {

  @Input() bgColor: string = 'primary';
  @Input() header: string = '';
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() maxWidth: string = '';
}
