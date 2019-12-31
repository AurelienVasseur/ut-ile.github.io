import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDisableUserComponent } from './dialog-disable-user.component';

describe('DialogDisableUserComponent', () => {
  let component: DialogDisableUserComponent;
  let fixture: ComponentFixture<DialogDisableUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDisableUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDisableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
