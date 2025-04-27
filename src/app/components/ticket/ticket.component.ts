import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormArray, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket',
  imports: [ReactiveFormsModule, FormsModule, NgFor],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit, OnDestroy {
  ticketForm: FormGroup;
  ticketFormSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      mainPassenger: [''],
      pets: this.fb.array([])
   });
   
   this.ticketFormSub = this.ticketForm.valueChanges.subscribe(ticketFormPayload => {
      console.log('ticketFormPayload ', ticketFormPayload);
   });
  }

  ngOnDestroy(): void {
    this.ticketFormSub.unsubscribe();
  }

  addPet() {
    const petForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required]
  });

    this.pets.push(petForm);
  }

  removePet(petIndex: number) {
    this.pets.removeAt(petIndex);
  }

  get pets() {
    return this.ticketForm.controls['pets'] as FormArray;
  }
}
