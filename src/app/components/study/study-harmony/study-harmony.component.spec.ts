import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyHarmonyComponent } from './study-harmony.component';

describe('StudyHarmonyComponent', () => {
  let component: StudyHarmonyComponent;
  let fixture: ComponentFixture<StudyHarmonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyHarmonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyHarmonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
