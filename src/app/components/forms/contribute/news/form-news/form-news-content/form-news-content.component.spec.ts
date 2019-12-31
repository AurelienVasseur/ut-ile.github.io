import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewsContentComponent } from './form-news-content.component';

describe('FormNewsContentComponent', () => {
  let component: FormNewsContentComponent;
  let fixture: ComponentFixture<FormNewsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
