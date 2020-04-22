import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from 'src/app/shared/interfaces'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  form: FormGroup;

  tasks: Task[]
  taskpSub: Subscription
  taskdSub: Subscription
  searchStr = ''

  constructor(private taskService: TaskService,
              private alert: AlertService) {
  }



  remove(id: string) {
    this.taskService.remove(id).subscribe(() => {
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

  ngOnInit() {
    this.form = new FormGroup({
      titletask: new FormControl(null, Validators.required),
    })
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const task: Task = {
      titletask: this.form.value.titletask,
      date: new Date()
    }

    this.taskService.createTask(task).subscribe(() => {
      this.form.reset();
      this.alert.success('Задача добавлена!');
    })
  }

}
