import { Injectable, OnInit } from '@angular/core';
import { Board } from './board';

const BOARDS_KEY = 'boards';
const CURRENT_ID_KEY = 'currentBoardId';

@Injectable({ providedIn: 'root' })
export class boardService {

    private boardsList: Board[] = [];
    private currentId: number = 0;

    constructor() {
        this.boardsList = JSON.parse(window.localStorage.getItem(BOARDS_KEY)) || [];
        this.currentId = new Board(this.boardsList[0]).id || 0;

        window.localStorage.setItem(CURRENT_ID_KEY, this.currentId.toString());
    }

    hasBoards() {
        return !!window.localStorage.getItem(BOARDS_KEY);
    }

    setBoard(board: Board) {
        this.boardsList.unshift(board);
        this.currentId = board.id;
        
        window.localStorage.setItem(CURRENT_ID_KEY, this.currentId.toString());
        window.localStorage.setItem(BOARDS_KEY, JSON.stringify(this.boardsList));
    }

    getBoard(id: number): Board {
        return new Board(JSON.parse(window.localStorage.getItem(BOARDS_KEY)).find(board => board._id == id));
    }

    getCurrentId() {
        return parseInt(window.localStorage.getItem(CURRENT_ID_KEY));
    }

    getAllBoards(): Board[] {
        const boards: Board[] = JSON.parse(window.localStorage.getItem(BOARDS_KEY)).map(obj => new Board(obj));

        if (boards.length >= 0) {
            this.currentId = boards[0].id;
        } else {
            this.currentId = 0;
        }

        window.localStorage.setItem(CURRENT_ID_KEY, this.currentId.toString());

        return boards;
    }

    removeBoard(id: number) {
        const index = this.boardsList.findIndex(board => {
            board = new Board(board);
            return board.id == id;
        });
        
        this.boardsList.splice(index, 1);
        
        window.localStorage.setItem(BOARDS_KEY, JSON.stringify(this.boardsList));
    }
}