import { Component, OnInit } from '@angular/core';
import { Board } from '../board/board';
import { boardService } from '../board/board.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  boards: Board[] = [];
  isFormOn: boolean = false;

  constructor(
    private boardService: boardService
  ) {}

  ngOnInit() {
    if (this.boardService.hasBoards())
      this.boards = this.boardService.getAllBoards();
  }

  showForm() {
    this.isFormOn = true;
  }

  updateBoards(board: Board) {
    if (board.id) {
      this.boards.unshift(board);
      this.isFormOn = false;
    }
  }

  closeForm(close: boolean) {
    if (close === true)
      this.isFormOn = false;
  }
}
