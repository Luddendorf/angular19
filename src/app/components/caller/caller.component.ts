import { Component, OnDestroy, OnInit } from '@angular/core';
import { CallerService } from '../../services/caller.service';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommentSimple } from '../../intefaces/comment-simple';

@Component({
  selector: 'app-caller',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './caller.component.html',
  styleUrl: './caller.component.scss'
})
export class CallerComponent implements OnInit, OnDestroy {
  userId = '1';
  userComments: CommentSimple[] = [];
  callerSub: Subscription;
  callerForm: FormGroup;

  constructor(private callerService: CallerService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.callerForm = this.fb.group({
      userId: ['']
   });
  }

  ngOnDestroy(): void {
    if (this.callerSub) {
      this.callerSub.unsubscribe();
    }
  }


  getUserComments(): void {
    const userId = this.callerForm.get('userId').getRawValue();

    this.callerSub = this.callerService.getUserComments$(userId).subscribe(comments => {
      this.userComments = comments;
    });
  }
}
