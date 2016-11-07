import {isPresent} from '@angular/core/src/facade/lang';
import {BaseError} from '@angular/core/src/facade/errors';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'visibleTodos'
})
export class VisibleTodosPipe implements PipeTransform {
  transform(todos, filter){ 
    if (!todos || !filter) return;
    if (isPresent(todos) && !Array.isArray(todos)){
      throw new BaseError('VisibleTodos pipe requires an Array as input');
    }
    return this.getVisibleTodos(todos, filter);
  }
  
  private getVisibleTodos(todos, filter){
    switch (filter) {
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.complete);
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.complete);
      case 'SHOW_ALL':
      default:
        return todos;
    }
  };
}