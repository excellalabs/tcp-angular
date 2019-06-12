import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IState, StateService } from '../../../services/state/state.service';

import { BaseForm } from '../../../abstracts/base-form.class';
import { IUSAddress } from '../../../../models/address.interface';
import { hasChanged } from '../../../../utils/functions';

@Component({
  selector: 'tcp-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends BaseForm implements OnInit, OnChanges, OnDestroy {

  @Input() address: IUSAddress = {} as IUSAddress
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

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.address)) {
      this.formGroup.patchValue(this.address)
    }
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
