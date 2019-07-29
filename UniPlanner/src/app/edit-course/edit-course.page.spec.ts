import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursePage } from './edit-course.page';

describe('EditCoursePage', () => {
  let component: EditCoursePage;
  let fixture: ComponentFixture<EditCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
