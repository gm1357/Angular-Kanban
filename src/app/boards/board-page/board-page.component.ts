import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from '../board/board';
import { boardService } from '../board/board.service';
import { TaskListService } from './task-list/task-list.service';
import { Task } from './task-list/task/task';
import { TaskList } from './task-list/task-list';

@Component({
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  boardId: number;
  board: Board;
  taskLists: TaskList[] = [];
  taskListsCdkIds: string[] = [];
  isFormOn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: boardService,
    private taskListService: TaskListService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = params.id;
      this.board = this.boardService.getBoard(this.boardId);
    });

    this.taskLists = this.taskListService.getTaskLists(this.boardId) || [];
    this.taskListsCdkIds = this.taskLists.map(taskList => `taskList_${taskList.id}`) || [];
  }

  remove() {
    this.boardService.removeBoard(this.board.id);
    this.router.navigate(['']);
  }

  showForm() {
    this.isFormOn = true;
  }

  closeForm(close: boolean) {
    if (close === true) {
      this.isFormOn = false;
    }
  }

  updateTaskLists(taskList: TaskList) {
    if (taskList.id) {
      this.taskLists.unshift(taskList);
      this.isFormOn = false;
    }
  }

}
