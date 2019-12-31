import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDwellingsComponent } from './study-dwellings.component';

describe('StudyDwellingsComponent', () => {
  let component: StudyDwellingsComponent;
  let fixture: ComponentFixture<StudyDwellingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyDwellingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDwellingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
