import { Injectable, OnInit } from '@angular/core';
import { Board } from './board';

@Injectable({ providedIn: 'root' })
export class boardService {

    private boardsList: Board[] = [];

    constructor() {
        this.boardsList = JSON.parse(window.localStorage.getItem('boards'));

        if (!this.boardsList) {
            this.boardsList = [];
        }
    }

    hasBoards() {
        return !!window.localStorage.getItem('boards');
    }

    setBoard(board: Board) {
        console.log(this.boardsList);
        this.boardsList.push(board);
        window.localStorage.setItem('boards', JSON.stringify(this.boardsList));
    }

    getBoard(id: number): Board {
        return new Board(JSON.parse(window.localStorage.getItem('boards')).find(board => board._id == id));
    }

    getAllBoards(): Board[] {
        return JSON.parse(window.localStorage.getItem('boards')).map(obj => new Board(obj));
    }

    removeBoard(id) {
        this.boardsList.splice(
            this.boardsList.findIndex(board => board.id == id)
        );
        
        window.localStorage.setItem('boards', JSON.stringify(this.boardsList));
    }
}