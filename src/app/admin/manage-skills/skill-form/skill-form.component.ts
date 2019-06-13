import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseForm } from 'src/app/employee/abstracts/base-form.class';
import { ICategory, ISkill } from 'src/app/models/skill.interface';
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service';
import { hasChanged, stringCompare } from 'src/app/utils/functions';

@Component({
  selector: 'tcp-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent extends BaseForm implements OnInit, OnChanges {

  @Input() skill: ISkill = {} as ISkill
  categories$: Observable<ICategory[]>

  constructor(private fb: FormBuilder, private categoryService: SkillCategoriesService) {
    super()
    this.categories$ = this.categoryService.list.pipe(map(cats => cats.sort((a, b) => stringCompare(a.name, b.name))));
    this.formGroup = this.buildForm()
  }

  ngOnInit() {
    this.categoryService.fetch()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.skill) && this.skill) {
      this.formGroup.patchValue(this.skill)
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: [null, [Validators.required]]
    })
  }

}
