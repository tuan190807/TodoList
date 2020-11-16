import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listTask = [];
  formTodo: FormGroup;
  checked = false;
  get form() { return this.formTodo.controls; }
  constructor(
    private fb: FormBuilder,
    private location: Location
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
      id: this.listTask.length < 1 ? 1 : this.listTask.length + 1,
      name: this.formTodo.value.name,
      description: this.formTodo.value.description,
      date: this.formTodo.value.date,
      proirity: this.formTodo.value.proirity,
      checked: false
    }
    this.listTask.push(item);
    console.log(this.listTask)
    const arrListTask = JSON.stringify(this.listTask);
    localStorage.setItem("arrTasks", arrListTask);
    this.initForm();
  }


}
