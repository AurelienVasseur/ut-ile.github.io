import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPhotosComponent } from './study-photos.component';

describe('StudyPhotosComponent', () => {
  let component: StudyPhotosComponent;
  let fixture: ComponentFixture<StudyPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
