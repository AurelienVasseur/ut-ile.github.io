import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutilitiesMemesComponent } from './futilities-memes.component';

describe('FutilitiesMemesComponent', () => {
  let component: FutilitiesMemesComponent;
  let fixture: ComponentFixture<FutilitiesMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutilitiesMemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutilitiesMemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
