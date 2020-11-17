import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { taskDTO } from './list-task-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listTask = [];
  formTodo: FormGroup;
  item = {} as taskDTO;
  get form() { return this.formTodo.controls; }
  constructor(
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) { }
  ngOnInit() {
    this.initForm();
    this.listTask = JSON.parse(localStorage.getItem('arrTasks'));
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
    this.item = {
      id: this.listTask.length < 1 ? 1 : this.listTask.length + 1,
      name: this.formTodo.value.name,
      description: this.formTodo.value.description,
      date: this.formTodo.value.date,
      proirity: this.formTodo.value.proirity,
    }
    this.listTask.push(this.item);
    const arrListTask = JSON.stringify(this.listTask);
    localStorage.setItem("arrTasks", arrListTask);
    this._snack.open(`Thêm task ${this.formTodo.value.name} thành công!`, "", { duration: 5000 });
    this.initForm();
  }


}
