import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    fixture.detectChanges();
  });

  it(`should render something`, () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
