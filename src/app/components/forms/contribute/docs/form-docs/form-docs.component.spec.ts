import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocsComponent } from './form-docs.component';

describe('FormDocsComponent', () => {
  let component: FormDocsComponent;
  let fixture: ComponentFixture<FormDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
