import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommunitySuggestComponent } from './form-community-suggest.component';

describe('FormCommunitySuggestComponent', () => {
  let component: FormCommunitySuggestComponent;
  let fixture: ComponentFixture<FormCommunitySuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCommunitySuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCommunitySuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
