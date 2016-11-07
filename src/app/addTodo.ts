import {Component, Inject} from '@angular/core';
import {TodoActions} from './todoActions';
import {Angular2Apollo} from 'angular2-apollo';
import gql from 'graphql-tag';

@Component({
  selector: 'add-todo', 
  template: 
    `<div>
      <input #todo>
      <button (click)="addTodo(todo)">Add todo</button>
    </div>`
})
export class AddTodo {
  constructor(
    @Inject('AppStore') private appStore: AppStore, 
    private todoActions: TodoActions,
    private apollo: Angular2Apollo
  ){ }
  
  private addTodo(input) {
    this.apollo.mutate({
      mutation: gql`
        mutation addTodo($text: String!) {
          createTodo(text: $text, complete: false) { id }
        }`,
      variables: {
        text: input.value
      }
    }).then(({data, errors}) => {
      if (errors) throw errors;
      this.appStore.dispatch(this.todoActions.addTodo({
        id: data.createTodo.id, 
        text: input.value,
        complete: false
      }));
      input.value = '';
    });
  }
}