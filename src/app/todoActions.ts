export const ADD_TODO = 'ADD_TODO';
export const INITIAL_LOAD = 'INITIAL_LOAD';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';

export class TodoActions {
  initialLoad(todos) {
    return {
      type: INITIAL_LOAD,
      todos: todos
    };
  }
  
  addTodo(todo){  
    return {
      type: ADD_TODO,
      id: todo.id,
      text: todo.text,
      complete: todo.complete
    };
  };
  
  toggleTodo(id, complete){
    return {
      type: TOGGLE_TODO,
      id: id,
      complete: complete
    };
  };
  
  setCurrentFilter(filter){
    return {
      type: SET_CURRENT_FILTER,
      filter: filter
    };
  };
}