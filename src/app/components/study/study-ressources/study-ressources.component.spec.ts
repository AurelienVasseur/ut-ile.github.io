import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyRessourcesComponent } from './study-ressources.component';

describe('StudyRessourcesComponent', () => {
  let component: StudyRessourcesComponent;
  let fixture: ComponentFixture<StudyRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
