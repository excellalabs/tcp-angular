import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material'

import { ISkill } from '../../../models/skill.interface'
import { SkillsService } from '../../../services/skills/skills.service'
import { stringCompare } from '../../../utils/functions'

@Component({
  selector: 'tcp-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit {
  @Output() editSkill = new EventEmitter<number>()
  @Output() deleteSkill = new EventEmitter<number>()

  displayedColumns: string[] = ['edit', 'name', 'category', 'delete']
  dataSource: MatTableDataSource<ISkill>

  constructor(public skillService: SkillsService) {
    this.dataSource = new MatTableDataSource<ISkill>([])
    this.skillService.list.subscribe(skills => {
      this.dataSource.data = [...skills].sort((a, b) => stringCompare(a.name, b.name))
    })
  }

  ngOnInit() {}

  applyTableFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
