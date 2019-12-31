import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserProfileComponent } from './form-user-profile.component';

describe('FormUserProfileComponent', () => {
  let component: FormUserProfileComponent;
  let fixture: ComponentFixture<FormUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
