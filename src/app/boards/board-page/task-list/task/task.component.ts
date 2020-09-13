import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: `Delete task '${this.title}'?`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.removeTask(this.boardId, this.taskListId, this.taskId);
        this.wasDeleted.emit();
        Swal.fire(
          'Task deleted',
          '',
          'success'
        );
      }
    });
  }
}
