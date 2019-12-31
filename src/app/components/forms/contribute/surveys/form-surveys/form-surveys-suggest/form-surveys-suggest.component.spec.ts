import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSurveysSuggestComponent } from './form-surveys-suggest.component';

describe('FormSurveysSuggestComponent', () => {
  let component: FormSurveysSuggestComponent;
  let fixture: ComponentFixture<FormSurveysSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSurveysSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSurveysSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
