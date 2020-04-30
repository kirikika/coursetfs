import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../admin/shared/services/auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  form: FormGroup
  authSub: Subscription

  constructor(private router: Router,
              private auth: AuthService
  ) {
  }
  goToLogin() {
    this.router.navigate(['/admin'])
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }
  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }

  submit() {
    this.form.disable()
    this.authSub = this.auth.register(this.form.value).subscribe(
        () => {
          this.router.navigate(['/admin/login'], {
            queryParams: {
              loginAgain: true
            }
          })
        },
        error => {
          console.warn(error)
          this.form.enable()
        }
    )
    if (this.form.invalid) {
      return
    }
  }
}