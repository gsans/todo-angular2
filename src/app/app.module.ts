import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ENV_PROVIDERS } from './environment';
import { AppComponent } from './app.component';

import {AddTodo} from './addTodo';
import {Todo} from './todo';
import {TodoList} from './todoList';
import {Filters} from './filters';
import {FilterLink} from './filterLink';
import {VisibleTodosPipe} from './visibleTodosPipe';

import {createStore} from 'redux';
import {rootReducer} from './rootReducer';
import {TodoActions} from './todoActions';

import { ApolloModule } from 'angular2-apollo';
import { client } from './client';

const appStore = createStore(rootReducer);

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent, AddTodo, TodoList, Todo, Filters, FilterLink, VisibleTodosPipe
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.withClient(client)
  ],
  providers: [ 
    ENV_PROVIDERS,
    { provide: 'AppStore', useValue: appStore },
    TodoActions,
  ]
})
export class AppModule { }