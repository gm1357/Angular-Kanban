import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from '../board/board';
import { boardService } from '../board/board.service';
import { TaskListService } from './task-list/task-list.service';
import { TaskList } from './task-list/task-list';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

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
  isEdit: boolean = false;

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
    this.updateCdkIds();
  }

  remove() {
    Swal.fire({
      title: `Delete board '${this.board.name}'?`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.boardService.removeBoard(this.board.id);
        this.router.navigate(['']);
        Swal.fire(
          'Board deleted',
          '',
          'success'
        );
      }
    });
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
      this.updateCdkIds();
      this.isFormOn = false;
    }
  }

  reloadTaskLists() {
    this.taskLists = this.taskListService.getTaskLists(this.boardId) || [];
  }

  onTaskListDrop(event: CdkDragDrop<TaskList[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.taskListService.setTaskLists(this.boardId, event.container.data);
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  editBoard(newTitle: string) {
    this.boardService.editBoard(this.boardId, newTitle);
    this.isEdit = false;
    this.board.name = newTitle;
  }

  private updateCdkIds() {
    this.taskListsCdkIds = this.taskLists.map(taskList => `taskList_${taskList.id}`) || [];
  }
}
