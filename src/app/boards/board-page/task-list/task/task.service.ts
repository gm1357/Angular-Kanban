import { Injectable } from '@angular/core';
import { Task } from './task';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {

  getCurrentId(boardId: number, taskListId: number) {
    const tasks = this.getTasks(boardId, taskListId);

    return !!tasks && tasks.length ? tasks[0].id : 0;
  }

  getTasks(boardId: number, taskListId: number): Task[] {
      let tasks = JSON.parse(
        window.localStorage.getItem(`${TASKS_KEY}${boardId}_${taskListId}`)
      );

      if (!!tasks && tasks.length) {
          tasks = tasks.map(obj => new Task(obj))
      }
      return tasks;
  }

  pushTask(boardId: number, taskListId: number, task: Task) {
    const tasks = this.getTasks(boardId, taskListId) || [];
    tasks.unshift(task);

    window.localStorage.setItem(
      `${TASKS_KEY}${boardId}_${taskListId}`, 
      JSON.stringify(tasks)
    );
  }

  editTask(boardId: number, taskListId: number, task: Task) {
    const tasks = this.getTasks(boardId, taskListId) || [];
    const index = tasks.findIndex(taskStored => taskStored.id === task.id);

    if (index >= 0) {
      tasks[index] = task;
  
      window.localStorage.setItem(
        `${TASKS_KEY}${boardId}_${taskListId}`, 
        JSON.stringify(tasks)
      );
    }
  }

  updateTaskList(boardId: number, taskListId: number, tasks: Task[]) {
    window.localStorage.setItem(
      `${TASKS_KEY}${boardId}_${taskListId}`, 
      JSON.stringify(tasks)
    );
  }

  removeTask(boardId: number, taskListId: number, taskId: number) {
    const tasks = this.getTasks(boardId, taskListId) || [];
    
    window.localStorage.setItem(
      `${TASKS_KEY}${boardId}_${taskListId}`, 
        JSON.stringify(tasks.filter(task => task.id !== taskId))
    )
  }

}