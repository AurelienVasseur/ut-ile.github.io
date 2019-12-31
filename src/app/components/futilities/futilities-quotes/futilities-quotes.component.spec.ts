import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutilitiesQuotesComponent } from './futilities-quotes.component';

describe('FutilitiesQuotesComponent', () => {
  let component: FutilitiesQuotesComponent;
  let fixture: ComponentFixture<FutilitiesQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutilitiesQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutilitiesQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
