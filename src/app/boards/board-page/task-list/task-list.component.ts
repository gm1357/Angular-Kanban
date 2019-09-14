import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task/task';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  @Input() title = 'New task list';
  @Input() taskListId: number;
  @Input() boardId: number;
  isFormOn = false;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks(this.boardId, this.taskListId) || [];
  }

  updateTasks(task: Task) {
    if (task instanceof Task) {
      this.tasks.unshift(task);
      this.isFormOn = false;
    }
  }

  showForm() {
    this.isFormOn = true;
  }

  closeForm(close: boolean) {
    if (close === true)
      this.isFormOn = false;
  }
}
