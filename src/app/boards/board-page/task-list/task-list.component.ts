import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task/task';
import { TaskService } from './task/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  @Input() taskListsCdkIds: string[] = []
  isFormOn = false;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.tasks = this.loadTasks();
    this.taskListsCdkIds = this.taskListsCdkIds.filter(id => id != `taskList_${this.taskListId}`);
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

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.updateTaskList(this.boardId, this.taskListId, event.container.data);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const transferTaskListId = parseInt(event.previousContainer.id.split('_')[1]);
      this.taskService.updateTaskList(this.boardId, this.taskListId, event.container.data);
      this.taskService.updateTaskList(this.boardId, transferTaskListId, event.previousContainer.data);
    }
  }

  reloadTasks() {
    this.tasks = this.loadTasks();
  }

  private loadTasks() {
    return this.taskService.getTasks(this.boardId, this.taskListId) || [];
  }
}
