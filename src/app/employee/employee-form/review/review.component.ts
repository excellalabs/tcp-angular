import { Component, Input, OnInit } from '@angular/core'

import { IEmployee } from '../../../models/employee.interface'

@Component({
  selector: 'tcp-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() employee: IEmployee

  constructor() {}

  ngOnInit() {}
}
