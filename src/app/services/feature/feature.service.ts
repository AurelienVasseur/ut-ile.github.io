import { Injectable } from '@angular/core';

import { Feature } from '../../models/home/feature';
import features from '../../../assets/json/features.json';

import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  features: Feature[];

  constructor(
    private database: AngularFirestore
  ) {
    this.features = features;
   }
  /*
  getFeatureById(id: number): Feature {
    return this.features.find((feature) => feature.id === id);
  }
  */
  getFeatureBySlug(slug: string): Feature {
    return this.features.find((feature) => feature.slug === slug);
  }

  getFeaturesByType(type: string): Feature[] {
    return this.features.filter((feature) => feature.type === type);
  }

  getFeatures(): Observable<Feature[]> {
    return this.database.collection<Feature>("features").valueChanges();
    // return this.features;
  }
}
