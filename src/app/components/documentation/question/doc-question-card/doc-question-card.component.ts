import { Component, OnInit, Input } from '@angular/core';
import { DocQuestion } from 'src/app/models/documentation/doc-question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-question-card',
  templateUrl: './doc-question-card.component.html',
  styleUrls: ['./doc-question-card.component.css']
})
export class DocQuestionCardComponent implements OnInit {
  @Input() question: DocQuestion;
  currentRoute: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

}
