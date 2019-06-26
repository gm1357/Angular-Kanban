import { Component, OnInit } from '@angular/core';
import { Board } from '../board/board';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  boards: Board[] = [];

  ngOnInit() {
    this.boards.push(new Board(1, "teste1", "primary"));
    this.boards.push(new Board(2, "teste2", "secondary"));
    this.boards.push(new Board(3, "teste3", "warning"));
    this.boards.push(new Board(4, "teste4", "danger"));
    this.boards.push(new Board(5, "teste5", "primary"));
    this.boards.push(new Board(6, "teste6", "primary"));
    this.boards.push(new Board(7, "teste7", "primary"));
  }

  newBoard() {
    this.boards.push(new Board(8, "teste32", "primary"));
  }
}
