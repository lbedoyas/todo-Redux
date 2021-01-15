import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtFisico: ElementRef;
  chkCompletado: FormControl;
  txtInput: FormControl;
  editando: boolean = false;

  constructor(private store: Store<AppState>){

   }

  ngOnInit(): void {
    console.log(this.todo);
    // this.todo.completado = true;
    console.log(this.todo);
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      console.log(valor);
      this.store.dispatch(actions.toggle({id: this.todo.id}))

    })
  }

  editar(){
    this.editando = true;
    console.log(this.txtFisico);
    this.txtInput.setValue( this.todo.text );

    setTimeout(() => {
      this.txtFisico.nativeElement.select();
      // this.editando = false;
      // this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}));
    }, 9000);

  }

  terminarEdicion(){
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo.text) {
      return;
    }
    this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}));
  }


  borrar(){
    this.store.dispatch( actions.borrar({id: this.todo.id}));
  }

}
