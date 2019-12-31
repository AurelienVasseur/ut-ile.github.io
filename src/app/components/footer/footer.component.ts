import { Component, OnInit } from '@angular/core';

import { Feature } from '../../models/home/feature';
import { FeatureService } from '../../services/feature/feature.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  serviceFeatures: Feature[];
  usefulLinkFeatures: Feature[];
  constructor(private featureService: FeatureService) { }

  ngOnInit() {
    this.featureService.getFeatures().subscribe((features: Feature[]) => {
      this.serviceFeatures = features.filter((feature: Feature) => feature.type === "service").sort((a: Feature, b: Feature) => a.sortId - b.sortId);
      this.usefulLinkFeatures = features.filter((feature: Feature) => feature.type === "useful_link").sort((a: Feature, b: Feature) => a.sortId - b.sortId);
    });
    //this.serviceFeatures = this.featureService.getFeaturesByType("service");
    //this.usefulLinkFeatures = this.featureService.getFeaturesByType("useful_link");
  }

}
