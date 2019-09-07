import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  @Input() bgColor = 'primary';
  @Input() title = '';

  constructor() { }

  ngOnInit() {
  }

}
