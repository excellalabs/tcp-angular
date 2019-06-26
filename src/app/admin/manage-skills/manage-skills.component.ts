import { Component, OnInit } from '@angular/core'

import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { ISkill } from '../../models/skill.interface'
import { SkillsService } from '../../services/skills/skills.service'

@Component({
  selector: 'tcp-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss'],
})
export class ManageSkillsComponent implements OnInit {
  skillToEdit: ISkill = null

  constructor(
    private skillService: SkillsService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {}

  onEditSkill(id: number) {
    this.skillToEdit = this.skillService.list.value.find(skill => skill.id === id)
  }

  onDeleteSkill(id: number) {
    this.skillService
      .delete(id)
      .subscribe(this.snackBarService.observerFor<ISkill>('Delete Skill'))
  }

  onAddSkill(skill: ISkill) {
    this.skillToEdit = null
    if (skill.id) {
      this.skillService
        .update(skill)
        .subscribe(this.snackBarService.observerFor<ISkill>('Update Skill'))
    } else {
      this.skillService
        .create(skill)
        .subscribe(this.snackBarService.observerFor<ISkill>('Create Skill'))
    }
  }
}
