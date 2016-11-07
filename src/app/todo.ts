import {Component, ContentChildren, Inject, ChangeDetectionStrategy, Input} from '@angular/core';
import {TodoActions} from './todoActions';
import {Angular2Apollo} from 'angular2-apollo';
import gql from 'graphql-tag';

@Component({
  selector: 'todo',
  template: `
    <li (click)="onTodoClick()"
      [style.textDecoration]="complete?'line-through':'none'">
      <ng-content></ng-content>
    </li> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Todo { 
  @Input() complete;
  @Input() id;

  constructor(
    @Inject('AppStore') private appStore: AppStore, 
    private todoActions: TodoActions,
    private apollo: Angular2Apollo
  ){ }
  
  private onTodoClick(){
    this.apollo.mutate({
      mutation: gql`
        mutation toggleTodo($id: ID!, $complete: Boolean!) {
          updateTodo(id: $id, complete: $complete) { id complete }
        }`,
      variables: {
        id: this.id,
        complete: !this.complete
      }
    }).then(({data, errors}) => {
      if (errors) throw errors;
      this.appStore.dispatch(
        this.todoActions.toggleTodo(data.updateTodo.id, data.updateTodo.complete)
      );
    });
  }
}