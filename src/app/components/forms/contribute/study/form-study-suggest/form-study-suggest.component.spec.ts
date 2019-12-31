import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStudySuggestComponent } from './form-study-suggest.component';

describe('FormStudySuggestComponent', () => {
  let component: FormStudySuggestComponent;
  let fixture: ComponentFixture<FormStudySuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStudySuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStudySuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
