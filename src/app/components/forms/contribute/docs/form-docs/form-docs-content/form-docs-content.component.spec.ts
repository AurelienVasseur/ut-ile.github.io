import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocsContentComponent } from './form-docs-content.component';

describe('FormDocsContentComponent', () => {
  let component: FormDocsContentComponent;
  let fixture: ComponentFixture<FormDocsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDocsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDocsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
