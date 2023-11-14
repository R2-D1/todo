import {Component, OnInit} from '@angular/core';
import {Task} from "../models/task.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoForm, TodoFormData} from "./todo.form";
import {priorities} from "../static-data/priorities";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public tasks: Task[] = [];
  public form!: FormGroup<TodoForm>;
  public isFormShown:boolean = false;
  protected isEditMode: boolean = false;
  public taskForEdit: number | null = null;
  protected completedTasks: number = 0;

  protected readonly priorities = priorities;

  constructor() {
    this.form = new FormGroup<TodoForm>({
      name: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): undefined {
    this.init();
  }

  protected onSubmit(): undefined {
    this.isEditMode ? this.editTask() : this.addTask()
  }

  public addTask(): undefined {
    const taskData = this.form.getRawValue() as TodoFormData;

    const task: Task = {
      name: taskData.name,
      priority: taskData.priority,
      completed: false,
    }

    this.tasks.push(task);
    this.updateStorage();
    this.isFormShown = false;
  }

  public removeAllTasks(): undefined {
    this.tasks = [];
    this.updateStorage();
    this.completedTasks = 0;
  }

  public removeTask(index: number): undefined {
    this.tasks.splice(index, 1);
    this.updateStorage();
    this.countCompletedTasks();
  }

  public showEditForm(index: number): undefined {
    const task = this.tasks[index];
    this.form.controls.name.setValue(task.name);
    this.form.controls.priority.setValue(task.priority);
    this.taskForEdit = index;
    this.isEditMode = true;
    this.isFormShown = true;
  }

  public editTask(): undefined {
    if (this.taskForEdit === null) {
      return;
    }

    const taskData = this.form.getRawValue() as TodoFormData;
    const task = this.tasks[this.taskForEdit];
    task.name = taskData.name;
    task.priority = taskData.priority;
    this.updateStorage();
    this.isFormShown = false;
  }

  public completeTask(index: number): undefined {
    this.tasks[index].completed = true;
    this.countCompletedTasks();
  }

  public showCreateForm(): undefined {
    this.isFormShown = true;
    this.isEditMode = false;
  }

  protected hideForm(): undefined {
    this.isFormShown = false;
    this.form.controls.name.setValue(null);
  }

  private updateStorage(): undefined {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private init(): undefined {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
      this.countCompletedTasks();
    }
  }

  private countCompletedTasks(): undefined {
    this.completedTasks = this.tasks.filter(task => task.completed).length;
  }
}
