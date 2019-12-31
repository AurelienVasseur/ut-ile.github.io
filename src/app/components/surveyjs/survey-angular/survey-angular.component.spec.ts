import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAngularComponent } from './survey-angular.component';

describe('SurveyAngularComponent', () => {
  let component: SurveyAngularComponent;
  let fixture: ComponentFixture<SurveyAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
