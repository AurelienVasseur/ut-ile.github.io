import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;
  @Input() featureSlug: string;
  @Input() buttonName: string;
  @Input() buttonIcon: string;
  constructor() { }

  ngOnInit() {
  }

}
