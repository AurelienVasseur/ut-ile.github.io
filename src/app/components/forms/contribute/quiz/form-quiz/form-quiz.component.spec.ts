import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuizComponent } from './form-quiz.component';

describe('FormQuizComponent', () => {
  let component: FormQuizComponent;
  let fixture: ComponentFixture<FormQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
