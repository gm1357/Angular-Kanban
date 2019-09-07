import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { boardService } from '../../board/board.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Board } from '../../board/board';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent implements OnInit {

  newBoardForm: FormGroup;
  selectColor = 'primary';
  @Output() change: EventEmitter<Board> = new EventEmitter<Board>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private boardService: boardService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.newBoardForm = this.formBuilder.group({
      name: [''],
      color: ['primary']
    });
  }

  saveForm() {
    const name = this.newBoardForm.get('name').value;
    const color = this.newBoardForm.get('color').value;

    this.newBoard(new Board({_id: (this.boardService.getCurrentId() + 1), _name: name, _color: color}));
    this.newBoardForm.reset();
  }

  newBoard(board: Board) {
    this.boardService.setBoard(board);
    this.change.emit(board);
  }

  cancelForm() {
    this.cancel.emit(true);
  }
}
