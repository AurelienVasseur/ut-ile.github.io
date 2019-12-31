import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyUvComponent } from './study-uv.component';

describe('StudyUvComponent', () => {
  let component: StudyUvComponent;
  let fixture: ComponentFixture<StudyUvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyUvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyUvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
