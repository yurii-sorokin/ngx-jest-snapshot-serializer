import { Component, NO_ERRORS_SCHEMA, Injector } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

export function initHostFixture({
  props = {},
  hooks = {},
  host = {},
  imports = [],
  declarations = [],
  template = ''
} = {}) {
  let fixture: ComponentFixture<any>

  @Component({
    selector: 'tst-host',
    template: ``
  })
  class HostComponent {
    constructor(public injector: Injector) { }
  }

  TestBed
    .configureTestingModule({
      declarations: [HostComponent, ...declarations],
      imports: [...imports],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .overrideComponent(HostComponent, {
      set: {
        host,
        template
      }
    })
    .compileComponents()

  Object.assign(HostComponent.prototype, hooks)
  fixture = TestBed.createComponent(HostComponent)
  Object.assign(fixture.componentInstance, props)
  fixture.detectChanges()

  return fixture
}
