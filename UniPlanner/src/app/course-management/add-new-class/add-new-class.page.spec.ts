import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClassPage } from './add-new-class.page';

describe('AddNewClassPage', () => {
  let component: AddNewClassPage;
  let fixture: ComponentFixture<AddNewClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
