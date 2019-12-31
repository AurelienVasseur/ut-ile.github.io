import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFutilitiesSuggestComponent } from './form-futilities-suggest.component';

describe('FormFutilitiesSuggestComponent', () => {
  let component: FormFutilitiesSuggestComponent;
  let fixture: ComponentFixture<FormFutilitiesSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFutilitiesSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFutilitiesSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
