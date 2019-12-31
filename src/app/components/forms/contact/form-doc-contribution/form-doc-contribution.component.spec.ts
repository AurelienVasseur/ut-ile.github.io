import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocContributionComponent } from './form-doc-contribution.component';

describe('FormDocContributionComponent', () => {
  let component: FormDocContributionComponent;
  let fixture: ComponentFixture<FormDocContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDocContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDocContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
