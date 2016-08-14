import {Component} from '@angular/core'
import {FilterLink} from './filterLink';

@Component({
  selector: 'filters',
  template: 
    '<p>Show: ' +
      '<filter-link filter="SHOW_ALL">All</filter-link>, ' + 
      '<filter-link filter="SHOW_ACTIVE">Active</filter-link>, ' +
      '<filter-link filter="SHOW_COMPLETED">Completed</filter-link>' +
    '</p>',
  directives: [FilterLink] 
})
export class Filters { }