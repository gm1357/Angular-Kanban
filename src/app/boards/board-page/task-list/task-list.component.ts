import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task/task';
import { TaskService } from './task/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskListService } from './task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() title = 'New task list';
  @Input() taskListId: number;
  @Input() boardId: number;
  @Input() taskListsCdkIds: string[] = [];
  
  @Output() wasRemoved = new EventEmitter<void>();
  
  tasks: Task[] = [];
  isFormOn = false;

  constructor(
    private taskService: TaskService,
    private taskListService: TaskListService
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

  removeTaskList() {
    this.taskListService.removeTaskList(this.boardId, this.taskListId);
    this.wasRemoved.emit();
  }

  private loadTasks() {
    return this.taskService.getTasks(this.boardId, this.taskListId) || [];
  }
}
