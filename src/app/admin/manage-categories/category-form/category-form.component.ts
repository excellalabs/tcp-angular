import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { BaseForm } from '../../../abstracts/base-form.class'
import { ICategory } from '../../../models/skill.interface'
import { hasChanged } from '../../../utils/functions'

@Component({
  selector: 'tcp-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent extends BaseForm implements OnChanges {
  @Input() category: ICategory = {} as ICategory
  @Output() submitCategory = new EventEmitter<ICategory>()

  constructor(private fb: FormBuilder) {
    super()
    this.formGroup = this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.category)) {
      if (this.category) {
        this.formGroup.patchValue(this.category)
      } else {
        this.formGroup.reset()
      }
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  onSubmit() {
    const newSkill: ICategory = this.formGroup.value
    if (this.category) {
      newSkill.id = this.category.id
    }

    this.submitCategory.emit(newSkill)
  }
}
