import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskList } from '../task-list/task-list';
import { TaskListService } from '../task-list/task-list.service';

@Component({
  selector: 'app-task-list-form',
  templateUrl: './task-list-form.component.html',
  styleUrls: ['./task-list-form.component.css']
})
export class TaskListFormComponent implements OnInit {

  newTaskListForm: FormGroup;
  @Input() boardId: number;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() change: EventEmitter<TaskList> = new EventEmitter<TaskList>();

  constructor(
    private formBuilder: FormBuilder,
    private taskListService: TaskListService
  ) { }

  ngOnInit() {
    this.newTaskListForm = this.formBuilder.group({
      name: ['']
    });
  }

  saveForm() {
    const name = this.newTaskListForm.get('name').value;

    this.newTaskList(new TaskList({_id: (this.taskListService.getCurrentId(this.boardId) + 1), _name: name}));
    this.newTaskListForm.reset();
  }

  cancelForm() {
    this.cancel.emit(true);
  }

  newTaskList(taskList: TaskList) {
    this.taskListService.pushTaskList(this.boardId, taskList);
    this.change.emit(taskList);
  }

}
