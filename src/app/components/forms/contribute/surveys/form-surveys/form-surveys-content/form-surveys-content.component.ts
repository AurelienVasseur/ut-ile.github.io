import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-surveys-content',
  templateUrl: './form-surveys-content.component.html',
  styleUrls: ['./form-surveys-content.component.css']
})
export class FormSurveysContentComponent implements OnInit {
  surveyJson: Object;
  data: Object;
  constructor() { }

  ngOnInit() {
  }

  fetchData(event: Object) {
    this.data = event;
    console.log(this.data);
  }

}
