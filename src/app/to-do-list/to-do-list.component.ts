import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  @Input() arrListTask: any
  formTodoList: FormGroup;
  checked = false;
  get form() { return this.formTodoList.controls; }
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.initForm();
    console.log(this.arrListTask)
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
  update(id: number) {
    this.arrListTask.forEach(s => {
      if (s.id == id) {
        s.name = this.formTodoList.value.name;
        s.description = this.formTodoList.value.description;
        s.date = this.formTodoList.value.date;
        s.proirity = this.formTodoList.value.proirity;
      }
    })
    localStorage.setItem("arrTasks", JSON.stringify(this.arrListTask));
  }
  remove(id: number) {
    let listTG = this.arrListTask.map(s => s.id);
    if (listTG.includes(id)) {
      this.arrListTask.splice(listTG.indexOf(id), 1);
    }
    localStorage.setItem("arrTasks", JSON.stringify(this.arrListTask));
  }
  onChange(name: string, $event) {
    this.arrListTask.map(s => s.name)[name] = $event.checked;
  }

}
