import { Component, OnInit } from '@angular/core';

import quizModel from '../../../../../../../assets/json/quiz/model.json';
@Component({
  selector: 'app-form-quiz-content',
  templateUrl: './form-quiz-content.component.html',
  styleUrls: ['./form-quiz-content.component.css']
})
export class FormQuizContentComponent implements OnInit {
  quizJson: Object;
  data: Object; 
  constructor() { }

  ngOnInit() {
    this.quizJson = quizModel;
  }

  fetchData(event: Object) {
    this.data = event;
    console.log(this.data);
  }

}
