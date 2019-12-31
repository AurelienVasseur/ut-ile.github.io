import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyMapsComponent } from './study-maps.component';

describe('StudyMapsComponent', () => {
  let component: StudyMapsComponent;
  let fixture: ComponentFixture<StudyMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
