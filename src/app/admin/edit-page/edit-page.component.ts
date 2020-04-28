import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  post: Post
  submitted = false
  updateSubscription: Subscription

  constructor( private route: ActivatedRoute,
               private postsService: PostsService,
               private alert: AlertService) {
  }
  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
}

  ngOnInit() {
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id'])
        })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true
    this.updateSubscription = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(()=>{
      this.submitted = false
      this.alert.success('Изменения добавлены');
    })
  }

}
