import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

}
