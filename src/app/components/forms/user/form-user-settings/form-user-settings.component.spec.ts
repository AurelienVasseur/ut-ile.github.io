import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserSettingsComponent } from './form-user-settings.component';

describe('FormUserSettingsComponent', () => {
  let component: FormUserSettingsComponent;
  let fixture: ComponentFixture<FormUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
