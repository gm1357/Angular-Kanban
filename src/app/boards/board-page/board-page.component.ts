import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../board/board';
import { boardService } from '../board/BoardService';

@Component({
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  boardId: number;
  board: Board;

  constructor(
    private route: ActivatedRoute,
    private boardService: boardService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = params.id;
      this.board = this.boardService.getBoard(this.boardId);
    });
  }

}
