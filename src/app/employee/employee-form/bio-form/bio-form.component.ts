import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ETHNICITY, IEmployeeBio } from '../../../models/employee.interface';

import { BaseForm } from '../../abstracts/base-form.class';
import { hasChanged } from '../../../utils/functions';

@Component({
  selector: 'tcp-bio-form',
  templateUrl: './bio-form.component.html',
  styleUrls: ['./bio-form.component.scss']
})
export class BioFormComponent extends BaseForm implements OnInit, OnChanges {

  @Input() bio: IEmployeeBio = {} as IEmployeeBio

  ethnicityOptions = Object.keys(ETHNICITY);

  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.emitFormReady();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.bio)) {
      this.formGroup.patchValue(this.bio)
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      middleInitial: ['', []],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      ethnicity: [null, [Validators.required]],
      usCitizen: [false, [Validators.required]]
    });
  }

  get firstName(): AbstractControl {
    return this.formGroup.get('firstName');
  }

  get middleInitial(): AbstractControl {
    return this.formGroup.get('middleInitial');
  }

  get lastName(): AbstractControl {
    return this.formGroup.get('lastName');
  }

  get dateOfBirth(): AbstractControl {
    return this.formGroup.get('birthDate');
  }

  get gender(): AbstractControl {
    return this.formGroup.get('gender');
  }

  get ethnicity(): AbstractControl {
    return this.formGroup.get('ethnicity');
  }

  get usCitizen(): AbstractControl {
    return this.formGroup.get('usCitizen');
  }


}
