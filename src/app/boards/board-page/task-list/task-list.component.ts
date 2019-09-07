import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task/task';
import { TaskListService } from "./task-list.service";
import { boardService } from '../../board/board.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  @Input() title = 'New task list';
  isFormOn = false;

  constructor(
    private taskListService: TaskListService,
    private boardService: boardService
  ) { }

  ngOnInit() {
    // let task: Task = {
    //   id: 1,
    //   color: 'primary',
    //   details: 'teste teste teste',
    //   title: 'TESTE 1'
    // };

    // this.tasks.push(task);

    // task = {
    //   id: 2,
    //   color: 'warning',
    //   details: 'teste teste teste',
    //   title: 'TESTE 2'
    // };

    // this.tasks.push(task);

    // task = {
    //   id: 3,
    //   color: 'danger',
    //   details: 'teste teste teste',
    //   title: 'TESTE 3'
    // };

    // this.tasks.push(task);
    // this.tasks.push(task);
    // this.tasks.push(task);
    // this.tasks.push(task);
    // this.tasks.push(task);
  }

  updateTasks(task: Task) {
    if (task.id) {
      this.tasks.push(task);
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
