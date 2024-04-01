import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from '../models/task.model';
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
    standalone: true,
    imports: []
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() removeTaskEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() showEditFormEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() completeTaskEmitter: EventEmitter<void> = new EventEmitter<void>();

  // special for resolve

  protected isControlShown: boolean = false;

  ngOnInit(): undefined {
  }

  protected removeTask(): undefined {
    this.removeTaskEmitter.emit();
  }

  protected showEditForm(): undefined {
    this.showEditFormEmitter.emit();
  }

  protected completeTask(): undefined {
    this.isControlShown = false;
    this.completeTaskEmitter.emit();
  }

  protected showControl(): undefined {
    this.isControlShown = true;
  }

  protected hideControl(): undefined {
    this.isControlShown = false;
  }
}
