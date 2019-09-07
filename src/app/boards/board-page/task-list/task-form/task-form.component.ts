import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

  newTaskForm: FormGroup;
  selectColor = 'primary';
  @Output() change: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      title: [''],
      details: [''],
      color: ['primary']
    });
  }

  saveForm() {
    const title = this.newTaskForm.get('title').value;
    const details = this.newTaskForm.get('details').value;
    const color = this.newTaskForm.get('color').value;

    this.newTask({id: 1, title, details, color});
    this.newTaskForm.reset();
  }

  newTask(task: Task) {
    this.taskService.setTask(task);
    this.change.emit(task);
  }

  cancelForm() {
    this.cancel.emit(true);
  }

}
