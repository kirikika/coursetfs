import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  form: FormGroup

  constructor(private router: Router) {
  }
  goToLogin() {
    this.router.navigate(['/admin'])
  }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.maxLength(20)
      ]),
      checkbox: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^#$_\-+!]*[#$_\-+!]).{5,}$/)
      ]),
    })
  }
  submit() {
    if (this.form.invalid) {
      this.form.reset()
    }
  }
}