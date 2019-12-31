import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuizSuggestComponent } from './form-quiz-suggest.component';

describe('FormQuizSuggestComponent', () => {
  let component: FormQuizSuggestComponent;
  let fixture: ComponentFixture<FormQuizSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuizSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuizSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
