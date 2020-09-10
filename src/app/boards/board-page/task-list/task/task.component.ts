import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent {

  @Input() bgColor = 'primary';
  @Input() title = '';
  @Input() canRemove = false;
  @Input() boardId: number;
  @Input() taskListId: number;
  @Input() taskId: number;

  @Output() wasDeleted = new EventEmitter<void>();

  constructor(
    private taskService: TaskService
  ) {}

  removerTask() {
    this.taskService.removeTask(this.boardId, this.taskListId, this.taskId);
    this.wasDeleted.emit();
  }
}
