import { Component, OnInit } from '@angular/core';
import { Board } from '../board/board';
import { boardService } from '../board/BoardService';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  boards: Board[] = [];

  constructor(private boardService: boardService) {}

  ngOnInit() {
    if (this.boardService.hasBoards())
      this.boards = this.boardService.getAllBoards();
  }

  showForm() {
    this.newBoard(new Board({_id: '1', _name: 'teste', _color: 'primary'}))
  }

  newBoard(board: Board) {
    this.boardService.setBoard(board);
    this.boards.push(board);
  }
}
