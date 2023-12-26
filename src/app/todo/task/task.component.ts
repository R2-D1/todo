import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {priorities} from "../../static-data/priorities";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() removeTaskEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() showEditFormEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() completeTaskEmitter: EventEmitter<void> = new EventEmitter<void>();

  protected isControlShown: boolean = false;
  protected readonly priorities = priorities;
  protected taskPriorityLabel!: string;

  ngOnInit(): undefined {
    this.setTaskPriority();
  }

  protected setTaskPriority(): undefined {
    console.log(this.task.priority);
    this.taskPriorityLabel =  this.priorities.find(priority => priority.value === this.task.priority)?.name || '';
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
