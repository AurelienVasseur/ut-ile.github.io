import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAssociationsComponent } from './study-associations.component';

describe('StudyAssociationsComponent', () => {
  let component: StudyAssociationsComponent;
  let fixture: ComponentFixture<StudyAssociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAssociationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
