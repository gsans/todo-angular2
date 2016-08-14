import * as TodoActions from './todoActions';

const initialState = {
  todos: [],
  currentFilter: 'SHOW_ALL'
}

export function rootReducer(state = initialState, action){
  switch (action.type) {
    case TodoActions.INITIAL_LOAD: 
      return {
        todos: action.todos.reverse(),
        currentFilter: state.currentFilter
      };
    case TodoActions.ADD_TODO: 
      return {
        todos: [{
          id: action.id,
          text: action.text,
          complete: action.complete
        }].concat(state.todos),
        currentFilter: state.currentFilter
      };
    case TodoActions.TOGGLE_TODO:
      return {
        todos: toggleTodo(state.todos, action),
        currentFilter: state.currentFilter
      };
    case TodoActions.SET_CURRENT_FILTER:
      return { 
        todos: state.todos.map(todo => todo),
        currentFilter: action.filter
      };
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
      id: action.id,
      text: todo.text,
      complete: action.complete
    };
  });
}