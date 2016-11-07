import * as TodoActions from './todoActions';
import { combineReducers } from 'redux';

const todos = (state = [], action) => {
  switch (action.type) {
    case TodoActions.INITIAL_LOAD: 
      return action.todos.reverse();
    case TodoActions.ADD_TODO: 
      return [{
          id: action.id,
          text: action.text,
          complete: action.complete
        }].concat(state);
    case TodoActions.TOGGLE_TODO:
      return toggleTodo(state, action);
    case TodoActions.REMOVE_TODO:
      return state.filter(todo => todo.id != action.id);
    default:
      return state;
  }
}; 

function toggleTodo(todos, action){
  //map returns new array
  return todos.map(todo => {
    //skip other items
    if (todo.id !== action.id)
      return todo;
    //toggle
    return {
      id: todo.id,
      text: todo.text,
      complete: !todo.complete
    };
  });
}

const currentFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_CURRENT_FILTER':
      return action.filter
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  todos: todos,
  currentFilter: currentFilter
});