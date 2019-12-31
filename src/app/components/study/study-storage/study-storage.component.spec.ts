import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStorageComponent } from './study-storage.component';

describe('StudyStorageComponent', () => {
  let component: StudyStorageComponent;
  let fixture: ComponentFixture<StudyStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
