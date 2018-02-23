import 'rxjs/add/observable/fromPromise'

import { Observable } from 'rxjs/Observable'
import { fakeAsync, tick } from '@angular/core/testing'
import { ElementRef } from '@angular/core'
import { initHostFixture } from './framework/host'

describe(`Bindings`, () => {
  it(`should print [input] properties with inlined values`, () => {
    const fixture = initHostFixture({
      template:
        `<div
          [stringProp]="'inline string'"
          [booleanProp]="false"
          [numberProp]="42"
          [objectProp]="{ deep: { deeper: { deepest: 'look at me' }}}"
        ></div>`
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print [input] properties with instance values`, () => {
    const fixture = initHostFixture({
      props: {
        numberValue: 777,
        booleanValue: true,
        stringValue: 'instance string',
        objectValue: { deep: { deeper: { deepest: 'look at me' } } },
        dateValue: new Date(1519388273690)
      },
      template:
        `<div
          [stringProp]="stringValue"
          [booleanProp]="booleanValue"
          [numberProp]="numberValue"
          [objectProp]="objectValue"
          [dateProp]="dateValue"
        ></div>`
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print async [input] properties`, fakeAsync(() => {
    const fixture = initHostFixture({
      props: {
        promiseValue: Promise.resolve('promise value'),
        observableValue: Observable.fromPromise(Promise.resolve('observable value'))
      },
      template:
        `<div
          [promiseProp]="promiseValue"
          [promisePropWithAsync]="promiseValue | async"
          [observableProp]="observableValue"
          [observablePropWithAsync]="observableValue | async"
        ></div>`
    })

    tick()
    fixture.detectChanges()

    expect(fixture).toMatchSnapshot()
  }))

  it(`should print (event) listeners`, () => {
    const fixture = initHostFixture({
      template:
        `<div
          (click)="clickAction()"
          (custom)="customAction()"
        ></div>`
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print @[host bindings]`, () => {
    const fixture = initHostFixture({
      host: {
        '[class.bound]': `true`,
        '[class.not-bound]': `false`,
        '[attr.title]': `'Yes, I can!'`,
        '[attr.data-title]': `'Yes, I can too!'`,
        '[style.display]': `'block'`,
        '[style.custom]': `'bound'`,
        '[disabled]': `false`,
        '[custom]': `true`,
      }
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print @(host listeners)`, () => {
    const fixture = initHostFixture({
      host: {
        '(click)': `clickAction()`,
        '(custom)': `customAction()`,
      }
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print [ngClass] output`, () => {
    const fixture = initHostFixture({
      template:
        `<div
          [ngClass]="{ 'active': true, notActive: false }"
        ></div>`
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print [ngStyle] output`, () => {
    const fixture = initHostFixture({
      template:
        `<div
          [ngStyle]="{ 'display': 'block', overflow: 'hidden' }"
        ></div>`
    })

    expect(fixture).toMatchSnapshot()
  })

  it(`should print actual html for [innerHTML]`, () => {
    const fixture = initHostFixture({
      props: {
        html: 'passed html',
      },
      hooks: {
        ngAfterViewInit() {
          const el = this.injector.get(ElementRef).nativeElement
          const targetEl = el.querySelector('.target')

          targetEl.innerHTML = `${targetEl.innerHTML} with updates`
        }
      },
      template:
        `<div class="target"
          [innerHTML]="html"
        ></div>`
    })

    fixture.detectChanges()

    expect(fixture).toMatchSnapshot()
  })
})
