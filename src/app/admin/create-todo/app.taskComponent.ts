import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';
import { TaskService } from '../../../app/shared/task.service';
import { Task } from '../../../app/shared/interfaces'
import { Subscription } from 'rxjs';

@Component({
  selector: 'task-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class TaskComponent implements OnInit, OnDestroy {

  tasks: Task[]
  taskpSub: Subscription
  taskdSub: Subscription
  searchStr = ''

  constructor(private tasksService: TaskService,
              private alert: AlertService) {
  }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks
    })
  }
  remove(id: string) {
    this.tasksService.remove(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id)
      this.alert.danger('Вы удалили заметку')
    })
  }
  ngOnDestroy() {
    if (this.taskpSub) {
      this.taskpSub.unsubscribe()
    }
    if (this.taskdSub) {
      this.taskdSub.unsubscribe()
    }
  }
}
