import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  formTodoList: FormGroup;
  checked = false;
  arrListTask = [];
  get form() { return this.formTodoList.controls; }
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.initForm();
    this.arrListTask = JSON.parse(localStorage.getItem("arrTasks"));
  }
  initForm() {
    this.formTodoList = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      date: [''],
      proirity: ['']
    });
  }
  detail(item: any) {
    this.formTodoList.patchValue({
      name: item.name,
      description: item.description,
      date: item.date,
      proirity: item.proirity
    });
  }

}
