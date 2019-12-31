import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocsSuggestComponent } from './form-docs-suggest.component';

describe('FormDocsSuggestComponent', () => {
  let component: FormDocsSuggestComponent;
  let fixture: ComponentFixture<FormDocsSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDocsSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDocsSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
