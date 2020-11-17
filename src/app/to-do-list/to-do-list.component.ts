import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  @Input() arrListTask: any
  formTodoList: FormGroup;
  lstChecked = [];
  keySearch: string;
  get form() { return this.formTodoList.controls; }
  constructor(
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) { }
  ngOnInit() {
    this.initForm();
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
    this._snack.open(`Xóa task có id: ${id} thành công!`, "", { duration: 5000 });
  }
  onChange(item: any, $event: MatCheckboxChange) {
    if ($event.checked) {
      this.lstChecked.push(item);
    } else {
      this.lstChecked.forEach((s, i) => {
        if (s.id == item.id) {
          this.lstChecked.splice(i, 1);
        }
      })
    }
  }
  removeAction() {
    const arrId = this.arrListTask.map(s => s.id);
    const arrRemove = this.lstChecked.map(s => s.id);
    arrRemove.forEach(item => {
      if (arrId.includes(item)) {
        this.arrListTask.splice(arrId.indexOf(item), 1);
      }
    })
    localStorage.setItem("arrTasks", JSON.stringify(this.arrListTask));
  }

}
