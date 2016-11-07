import {Component, Inject, OnDestroy} from '@angular/core';
import {Todo} from './todo';
import {TodoActions} from './todoActions';
import {VisibleTodosPipe} from './visibleTodosPipe';

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <todo 
        *ngFor="let todo of todos | visibleTodos:currentFilter"
        [complete]="todo.complete"
        [id]="todo.id"
      >{{todo.text}}</todo>
    </ul>
  `
})

export class TodoList implements OnDestroy {
  unsubscribe;
  currentFilter = 'SHOW_ALL';
  todos;

  constructor(
    @Inject('AppStore') private appStore: AppStore,
    private todoActions: TodoActions
  ){
    this.unsubscribe = this.appStore.subscribe(()=> {
      let state = this.appStore.getState();
      this.currentFilter = state.currentFilter;
      this.todos = state.todos;
    });
  }
  
  ngOnDestroy(){
    //remove listener
    this.unsubscribe();
  }
}

