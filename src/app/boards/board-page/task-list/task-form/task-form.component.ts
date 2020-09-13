import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() taskListId: number;
  @Input() boardId: number;
  @Input() title = '';
  @Input() bgColor = 'primary';
  @Input() details = '';
  @Input() taskId = null;

  @Output() change: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      title: [this.title],
      details: [this.details],
      color: [this.bgColor]
    });
    this.selectColor = this.bgColor;
  }

  saveForm() {
    const title = this.newTaskForm.get('title').value;
    const details = this.newTaskForm.get('details').value;
    const color = this.newTaskForm.get('color').value;

    if (this.taskId === null) {
      this.newTask(new Task({
        _id: (this.taskService.getCurrentId(this.boardId, this.taskListId) + 1), 
        _title: title, 
        _details: details, 
        _color: color
      }));
  
      this.newTaskForm.reset();
    } else {
      this.updateTask(new Task({
        _id: this.taskId, 
        _title: title, 
        _details: details, 
        _color: color
      }));
    }
  }

  newTask(task: Task) {
    this.taskService.pushTask(this.boardId, this.taskListId, task);
    this.change.emit(task);
  }

  updateTask(task: Task) {
    this.taskService.editTask(this.boardId, this.taskListId, task);
    this.change.emit(task);
  }

  cancelForm() {
    this.cancel.emit(true);
  }

}
