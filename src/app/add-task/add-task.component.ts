import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { taskDTO } from '../list-task-dto';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  listTask = [];
  formTodo: FormGroup;
  checked = false;
  get form() { return this.formTodo.controls; }
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formTodo = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      date: [new Date()],
      proirity: [1]
    });
  }
  save() {
    let item = {
      name: this.formTodo.value.name,
      description: this.formTodo.value.description,
      date: this.formTodo.value.date,
      proirity: this.formTodo.value.proirity,
    }
    this.listTask.push(item);
    const arrListTask = JSON.stringify(this.listTask);
    localStorage.setItem("arrTasks", arrListTask);
    this.initForm();
  }

}
