import { Component, Input, OnInit } from '@angular/core'

export interface IDataPoint {
  amount: number
  label: string
}

@Component({
  selector: 'tcp-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() chartLabel = 'Chart Label'
  @Input() data: IDataPoint[] = []
  @Input() chartType = 'pie'

  chartLabels: string[] = []
  chartData: number[] = []

  ngOnInit() {
    this.updateData(this.data)
  }

  updateData(data: IDataPoint[]) {
    this.chartLabels = data.map(p => p.label)
    this.chartData = data.map(p => p.amount)
  }

  chartClick(e: any) {
    // console.log('click', e)
  }
}
