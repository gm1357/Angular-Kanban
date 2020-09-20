import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent {

  @Input() bgColor = 'primary';
  @Input() title = '';
  @Input() details = '';
  @Input() canRemove = false;
  @Input() canEdit = false;
  @Input() boardId: number;
  @Input() taskListId: number;
  @Input() taskId: number;

  @Output() shouldUpdate = new EventEmitter<void>();

  isEditar = false;

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
        this.shouldUpdate.emit();
        Swal.fire(
          'Task deleted',
          '',
          'success'
        );
      }
    });
  }

  editarTask() {
    this.isEditar = true;
  }

  closeForm(close: boolean) {
    if (close === true)
    this.isEditar = false;
  }

  editedTask(task: Task) {
    if (task instanceof Task) {
      this.bgColor = task.color;
      this.title = task.title;
      this.details = task.details;
      this.shouldUpdate.emit();
      this.isEditar = false;
    }
  }
}
