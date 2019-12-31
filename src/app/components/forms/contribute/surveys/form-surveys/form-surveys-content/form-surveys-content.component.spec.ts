import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSurveysContentComponent } from './form-surveys-content.component';

describe('FormSurveysContentComponent', () => {
  let component: FormSurveysContentComponent;
  let fixture: ComponentFixture<FormSurveysContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSurveysContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSurveysContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
