import { Component, OnInit } from '@angular/core';
import { DocSubcategory } from 'src/app/models/documentation/doc-subcategory';
import { DocQuestion } from 'src/app/models/documentation/doc-question';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { BadgeService } from 'src/app/services/badges/badge.service';
import { Badge } from 'src/app/models/badge';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subcategory: DocSubcategory;
  questions: Array<DocQuestion>;
  previousRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private documentationService: DocumentationService,
    private badgeService: BadgeService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Doc'UT - UTile");
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    this.route.params.subscribe((params) => {
      this.fetchSubcategoryBySlug(params["subcategory"]);
    });
  }

  fetchSubcategoryBySlug(slug: string) {
    this.documentationService.getSubcategories().subscribe((docSubcategories: DocSubcategory[]) => {
      this.subcategory = docSubcategories.find((docSubcategory: DocSubcategory) => docSubcategory.slug === slug);
      if(this.subcategory) {
        this.fetchQuestions();
      }
      else {
        this.navigationService.redirectTo(this.previousRoute);
      }
    })
  }

  fetchQuestions() {
    this.questions = new Array<DocQuestion>();
    this.subcategory.questions.forEach((questionId: string) => {
      this.documentationService.getQuestionById(questionId).subscribe((question: DocQuestion) => {
        this.fetchBadges(question);
        let foundQuestion: DocQuestion = this.questions.find((docQuestion: DocQuestion) => docQuestion.slug === question.slug);
        if(foundQuestion) {
          this.questions[this.questions.indexOf(foundQuestion)] = question;
        }
        else {
          this.questions.push(question);
        }
        // TODO sort questions
      });
    });
  }

  fetchBadges(question: DocQuestion) {
    question.badges.forEach((badgeId: string, key: number) => {
      if(badgeId) {
        this.badgeService.getBadgeById(badgeId).subscribe((badge: Badge) => {
          question.badges[key] = badge;
        });
      }
    });
  }

}
