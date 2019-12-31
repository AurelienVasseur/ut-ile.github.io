import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAgendaComponent } from './study-agenda.component';

describe('StudyAgendaComponent', () => {
  let component: StudyAgendaComponent;
  let fixture: ComponentFixture<StudyAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
