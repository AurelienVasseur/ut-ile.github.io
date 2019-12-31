import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewsComponent } from './form-news.component';

describe('FormNewsComponent', () => {
  let component: FormNewsComponent;
  let fixture: ComponentFixture<FormNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
