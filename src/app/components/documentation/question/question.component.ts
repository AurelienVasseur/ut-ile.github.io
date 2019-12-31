import { Component, OnInit } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { DocQuestion } from 'src/app/models/documentation/doc-question';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: DocQuestion;
  previousRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentationService: DocumentationService,
    private navigationService: NavigationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Doc'UT - UTile");
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    this.route.params.subscribe((params) => {
      this.fetchQuestionBySlug(params["question"]);
    });
  }

  fetchQuestionBySlug(slug: string) {
    this.documentationService.getQuestions().subscribe((questions: DocQuestion[]) => {
      this.question = questions.find((question: DocQuestion) => question.slug === slug);
      if(!this.question) {
        this.navigationService.redirectTo(this.previousRoute);
      }
    });
  }

}
