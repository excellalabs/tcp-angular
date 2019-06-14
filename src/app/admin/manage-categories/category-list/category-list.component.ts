import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material'
import { ICategory } from 'src/app/models/skill.interface'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'
import { stringCompare } from 'src/app/utils/functions'

@Component({
  selector: 'tcp-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @Output() editCategory = new EventEmitter<number>()
  @Output() deleteCategory = new EventEmitter<number>()

  displayedColumns: string[] = ['edit', 'name', 'delete']
  dataSource: MatTableDataSource<ICategory>

  constructor(public categoryService: SkillCategoriesService) {
    this.dataSource = new MatTableDataSource<ICategory>([])
    this.categoryService.list.subscribe(skills => {
      this.dataSource.data = skills.sort((a, b) => stringCompare(a.name, b.name))
    })
  }

  ngOnInit() {
    this.categoryService.fetch()
  }

  applyTableFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
