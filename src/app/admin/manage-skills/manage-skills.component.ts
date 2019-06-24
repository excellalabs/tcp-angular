import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ISkill } from 'src/app/models/skill.interface'
import { SkillsService } from 'src/app/services/skills/skills.service'

@Component({
  selector: 'tcp-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss'],
})
export class ManageSkillsComponent implements OnInit {
  skillToEdit: ISkill = null

  constructor(private skillService: SkillsService) {}

  ngOnInit() {}

  onEditSkill(id: number) {
    this.skillToEdit = this.skillService.list.value.find(skill => skill.id === id)
  }

  onDeleteSkill(id: number) {
    this.skillService.delete(id)
  }

  onAddSkill(skill: ISkill) {
    this.skillToEdit = null
    this.skillService.create(skill)
  }
}
