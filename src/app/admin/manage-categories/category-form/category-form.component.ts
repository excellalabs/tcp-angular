import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BaseForm } from 'src/app/employee/abstracts/base-form.class'
import { ICategory } from 'src/app/models/skill.interface'
import { hasChanged } from 'src/app/utils/functions'

@Component({
  selector: 'tcp-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent extends BaseForm implements OnChanges {
  @Input() category: ICategory = {} as ICategory
  @Output() addCategory = new EventEmitter<ICategory>()

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

    this.addCategory.emit(newSkill)
  }
}
