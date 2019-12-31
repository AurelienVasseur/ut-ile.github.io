import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSurveysComponent } from './form-surveys.component';

describe('FormSurveysComponent', () => {
  let component: FormSurveysComponent;
  let fixture: ComponentFixture<FormSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
