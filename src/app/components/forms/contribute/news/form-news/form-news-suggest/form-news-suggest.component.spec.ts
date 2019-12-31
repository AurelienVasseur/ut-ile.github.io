import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewsSuggestComponent } from './form-news-suggest.component';

describe('FormNewsSuggestComponent', () => {
  let component: FormNewsSuggestComponent;
  let fixture: ComponentFixture<FormNewsSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewsSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewsSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
