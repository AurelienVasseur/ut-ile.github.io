import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuizContentComponent } from './form-quiz-content.component';

describe('FormQuizContentComponent', () => {
  let component: FormQuizContentComponent;
  let fixture: ComponentFixture<FormQuizContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuizContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
