import { Injectable } from '@angular/core';
import { TaskList } from './task-list';

const TASKS_KEY = 'taskList';
const CURRENT_ID_KEY = 'currentTaskListId';

@Injectable({ providedIn: 'root' })
export class TaskListService {

    getCurrentId(boardId: number) {
        const taskLists = this.getTaskLists(boardId);

        return !!taskLists ? taskLists[0].id : 0;
    }
    
    getTaskLists(boardId: number): TaskList[] {
        let taskLists = JSON.parse(window.localStorage.getItem(TASKS_KEY + boardId));

        if (!!taskLists && taskLists.length) {
            taskLists = taskLists.map(obj => new TaskList(obj))
        }
        return taskLists;
    }
    
    pushTaskList(boardId: number, taskList: TaskList) {
        const taskLists = this.getTaskLists(boardId) || [];
        taskLists.unshift(taskList);

        window.localStorage.setItem(TASKS_KEY + boardId, JSON.stringify(taskLists));
    }

}