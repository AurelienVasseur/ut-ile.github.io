import { Component, OnInit, Input } from '@angular/core';

import { Feature } from '../../../models/home/feature';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {
  @Input() feature: Feature;

  constructor() { }

  ngOnInit() {  }

}
