import { Injectable } from '@angular/core';
import { Board } from './board';

const BOARDS_KEY = 'boards';
const CURRENT_ID_KEY = 'currentBoardId';

@Injectable({ providedIn: 'root' })
export class boardService {

    private boardsList: Board[] = [];
    private currentId: number = 0;

    constructor() {
        this.boardsList = this.getBoardList() || [];
        this.currentId = new Board(this.boardsList[0]).id || 0;

        this.setCurrentId(this.currentId);
    }
    
    private getBoardList() {
        return JSON.parse(window.localStorage.getItem(BOARDS_KEY));
    }

    private setBoardList(boards: Board[]) {
        window.localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
    }
    
    getCurrentId() {
        return parseInt(window.localStorage.getItem(CURRENT_ID_KEY));
    }

    private setCurrentId(id: number) {
        if (id == 0 || id > this.getCurrentId()) {
            window.localStorage.setItem(CURRENT_ID_KEY, id.toString());
        }
    }

    hasBoards() {
        const boards = this.getBoardList();
        return !!boards && boards.length;
    }

    setBoard(board: Board) {
        this.boardsList.unshift(board);
        this.currentId = board.id;
        
        this.setCurrentId(this.currentId);
        this.setBoardList(this.boardsList);
    }

    getBoard(id: number): Board {
        return new Board(this.getBoardList().find(board => board._id == id));
    }

    getAllBoards(): Board[] {
        const boards: Board[] = this.getBoardList().map(obj => new Board(obj));

        if (boards.length >= 0) {
            this.currentId = boards[0].id;
        } else {
            this.currentId = 0;
        }

        this.setCurrentId(this.currentId);

        return boards;
    }

    removeBoard(id: number) {
        const index = this.boardsList.findIndex(board => {
            board = new Board(board);
            return board.id == id;
        });
        
        this.boardsList.splice(index, 1);
        
        this.setBoardList(this.boardsList);
    }

    editBoard(id: number, newTitle: string) {
        const boards = this.getBoardList();
        const index = boards.findIndex(board => board._id == id);
        boards[index].name = newTitle;
        this.setBoardList(boards);
    }
}