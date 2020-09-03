import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task/task';
import { TaskService } from './task/task.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      console.log(event);
      if (event.currentIndex != event.previousIndex) {
        this.interchangeTasks(
          event.previousIndex,
          event.currentIndex,
          event.currentIndex > event.previousIndex
        );
        this.taskService.updateTaskList(this.boardId, this.taskListId, this.tasks);
      }
    } else {
      console.log('mudou de lista');
    }
  }

  private interchangeTasks(currentIndex: number, nextIndex: number, isDescend: boolean) {
    let taskToMove = this.tasks[currentIndex];
    let taskToBeReplaced = this.tasks[nextIndex];
    const moveDirection = isDescend ? -1 : 1;
    const checkCondition = isDescend ? () => nextIndex >= currentIndex : () => nextIndex <= currentIndex;

    while (checkCondition()) {
      this.tasks[nextIndex] = taskToMove;
      taskToMove = taskToBeReplaced;
      taskToBeReplaced = this.tasks[nextIndex = nextIndex + moveDirection];
    }
  }
}
