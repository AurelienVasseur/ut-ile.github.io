import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocQuestionCardComponent } from './doc-question-card.component';

describe('DocQuestionCardComponent', () => {
  let component: DocQuestionCardComponent;
  let fixture: ComponentFixture<DocQuestionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocQuestionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
