import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  testRequest() {
    this.httpClient.get('tests').subscribe()
  }
}
