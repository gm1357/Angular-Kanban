import { Injectable, OnInit } from '@angular/core';
import { Board } from './board';

@Injectable({ providedIn: 'root' })
export class boardService {

    private boardsList: Board[] = [];
    private currentId: number;

    constructor() {
        this.boardsList = JSON.parse(window.localStorage.getItem('boards'));
        this.currentId = new Board(this.boardsList[0]).id;

        if (!this.boardsList) {
            this.boardsList = [];
            this.currentId = 0;
        }
    }

    hasBoards() {
        return !!window.localStorage.getItem('boards');
    }

    setBoard(board: Board) {
        console.log(this.boardsList);
        this.boardsList.unshift(board);
        this.currentId = board.id;
        
        window.localStorage.setItem('currentBoardId', this.currentId.toString());
        window.localStorage.setItem('boards', JSON.stringify(this.boardsList));
    }

    getBoard(id: number): Board {
        return new Board(JSON.parse(window.localStorage.getItem('boards')).find(board => board._id == id));
    }

    getCurrentId() {
        return parseInt(window.localStorage.getItem('currentBoardId'));
    }

    getAllBoards(): Board[] {
        const boards: Board[] = JSON.parse(window.localStorage.getItem('boards')).map(obj => new Board(obj));

        if (boards.length) {
            this.currentId = boards[0].id;
        } else {
            this.currentId = 0;
        }

        window.localStorage.setItem('currentBoardId', this.currentId.toString());

        return boards;
    }

    removeBoard(id: number) {
        const index = this.boardsList.findIndex(board => {
            board = new Board(board);
            return board.id == id;
        });
        
        this.boardsList.splice(index, 1);
        
        window.localStorage.setItem('boards', JSON.stringify(this.boardsList));
    }
}