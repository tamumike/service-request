/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinalCommentCreateComponent } from './final-comment-create.component';

describe('FinalCommentCreateComponent', () => {
  let component: FinalCommentCreateComponent;
  let fixture: ComponentFixture<FinalCommentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalCommentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCommentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
