import { Injectable } from '@angular/core';
import { TaskList } from './task-list';

const TASKS_KEY = 'taskList';

@Injectable({ providedIn: 'root' })
export class TaskListService {

    getCurrentId(boardId: number) {
        const taskLists = this.getTaskLists(boardId);
        return !!taskLists && taskLists.length ? taskLists.sort((a, b) => b.id - a.id)[0].id : 0;
    }
    
    getTaskLists(boardId: number): TaskList[] {
        let taskLists = this.loadTaskLists(boardId);
        return taskLists;
    }
    
    pushTaskList(boardId: number, taskList: TaskList) {
        const taskLists = this.getTaskLists(boardId) || [];
        taskLists.unshift(taskList);

        this.setTaskLists(boardId, taskLists);
    }

    removeTaskList(boardId: number, taskListId: number) {
        let taskLists = this.loadTaskLists(boardId);

        this.setTaskLists(boardId, taskLists.filter(taskList => taskList.id !== taskListId));
    }

    setTaskLists(boardId: number, taskLists: TaskList[]) {
        window.localStorage.setItem(TASKS_KEY + boardId, JSON.stringify(taskLists));
    }

    updateTaskListTitle(boardId: number, taskListId: number, newTitle: string) {
        let taskLists = this.loadTaskLists(boardId);
        const index = taskLists.findIndex(taskList => taskList.id === taskListId);
        taskLists[index] = new TaskList({_id: taskListId, _name: newTitle});
        this.setTaskLists(boardId, taskLists);
    }

    private loadTaskLists(boardId: number): TaskList[] {
        let taskLists = JSON.parse(window.localStorage.getItem(TASKS_KEY + boardId));

        if (!!taskLists && taskLists.length) {
            taskLists = taskLists.map(obj => new TaskList(obj));
        }

        return taskLists;
    }
}