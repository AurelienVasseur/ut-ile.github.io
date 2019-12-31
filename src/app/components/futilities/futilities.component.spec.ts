import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutilitiesComponent } from './futilities.component';

describe('FutilitiesComponent', () => {
  let component: FutilitiesComponent;
  let fixture: ComponentFixture<FutilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
