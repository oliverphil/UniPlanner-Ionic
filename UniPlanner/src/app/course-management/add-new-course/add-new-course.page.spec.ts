import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCoursePage } from './add-new-course.page';

describe('AddNewCoursePage', () => {
  let component: AddNewCoursePage;
  let fixture: ComponentFixture<AddNewCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
