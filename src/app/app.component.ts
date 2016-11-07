import {TodoActions} from './todoActions';

import {Angular2Apollo} from 'angular2-apollo';
import {client} from '../client';
import gql from 'graphql-tag';

//our root app component
import {Component, Inject, ViewEncapsulation} from '@angular/core'
import {AddTodo} from './addTodo';
import {TodoList} from './todoList';
import {Filters} from './filters';

@Component({
  selector: 'app',
  template: 
    `<div>
      <add-todo></add-todo>
      <todo-list></todo-list>
      <filters></filters>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
})
export class AppComponent { 
   constructor(
    @Inject('AppStore') private appStore: AppStore,
    private todoActions: TodoActions,
    private apollo: Angular2Apollo
  ){
    apollo.query({
      query: gql`
        query todos {
          allTodoes {
            id
            complete
            text
          }
        }`,
        forceFetch: true
    }).then(result => {
      this.appStore.dispatch(
        this.todoActions.initialLoad(result.data.allTodoes)
      )
    }).catch(error => {
      console.log(`Error: ${error.message}`);
    });
  }
}