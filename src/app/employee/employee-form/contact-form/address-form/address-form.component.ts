import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IState, StateService } from '../../../services/state/state.service';

import { BaseForm } from '../../../abstracts/base-form.class';

@Component({
  selector: 'tcp-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends BaseForm implements OnInit, OnDestroy {

  hasUnitNumber = false;
  states$ = new BehaviorSubject<IState[]>([]);

  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private stateService: StateService) {
    super();
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.emitFormReady();
    this.subs.push(
      this.stateService.getStates().subscribe(states => this.states$.next(states))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      if (!s.closed) {
        s.unsubscribe();
      }
    });
  }

  buildForm(): FormGroup {
    return this.fb.group({
      line1: [null, Validators.required],
      line2: null,
      city: [null, Validators.required],
      stateCode: [null, Validators.required],
      zipCode: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      ],
    });
  }

  onSubmit() {
    alert('Thanks!');
  }
}
