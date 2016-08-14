import {isPresent, isArray} from '@angular/core/src/facade/lang';
import {BaseException} from '@angular/core/src/facade/exceptions';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'visibleTodos'
})
export class VisibleTodosPipe implements PipeTransform {
  transform(todos, filter){ 
    if (!todos || !filter) return;
    if (isPresent(todos) && !isArray(todos)){
      throw new BaseException('VisibleTodos pipe requires an Array as input');
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