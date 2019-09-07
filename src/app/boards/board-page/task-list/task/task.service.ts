import { Injectable } from '@angular/core';
import { Task } from './task';

const TASKS_KEY = 'taskList';

@Injectable({ providedIn: 'root' })
export class TaskService {

  setTask(task: Task) {
    throw new Error("Method not implemented.");
  }

}