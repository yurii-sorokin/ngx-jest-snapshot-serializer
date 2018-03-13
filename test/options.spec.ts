import { ComponentFixture } from '@angular/core/testing'
import { createFixtureSerializer } from '../src/serializer'
import { initHostFixture } from './framework/host'

describe(`Options`, () => {
  let fixture: ComponentFixture<any>

  beforeEach(() => {
    fixture = initHostFixture({
      template:
        `<div
          [someInput]="'some input static value'"
          [anotherInput]="'another input static value'"
          [ngClass]="{ 'directiveClassOn': true, 'directiveClassOff': false }"
          [ngStyle]="{ 'directiveStyleRule': 'directiveStyleRuleValue' }"
          (someListener)="someAction()"
          (anotherListener)="anotherAction()"
          class="staticClass"
          style="staticStyleRule: staticStyleRuleValue;"
          someAttr="some attr value"
          anotherAttr="another attr value"
          data-some-attr="some data attr value"
          data-another-attr="another data attr value"
        >
          <!--static comment-->
          <ng-container *ngIf="true"></ng-container>
          <ng-container *ngIf="false"></ng-container>
          <div *ngIf="true">conditional</div>
          <div *ngIf="false"></div>
        </div>`,
      props: {
        someAction: () => 'do something',
        anotherAction: () => 'do something else'
      },
      host: {
        '[boundAttr]': `'bound attr value'`,
        '[class.boundClass]': `true`,
        '[style.display]': `'block'`,
        '(boundListener)': `boundAction`,
      }
    })
  })

  it(`should ignore "ng-version" property by default`, () => {
    expect.addSnapshotSerializer(createFixtureSerializer({}))

    expect(fixture).toMatchSnapshot()
  })

  it(`should ignore specified properties`, () => {
    expect.addSnapshotSerializer(createFixtureSerializer({
      ignoreProps: [
        'boundAttr',
        'boundListener',
        'class',
        'style',
        'someInput',
        'someAttr',
        'data-some-attr',
        'someListener',
      ]
    }))

    expect(fixture).toMatchSnapshot()
  })

  it(`should ignore properties by regular expression`, () => {
    expect.addSnapshotSerializer(createFixtureSerializer({
      ignoreProps: [
        '/.*some/',
        '/^ng-reflect/',
      ]
    }))

    expect(fixture).toMatchSnapshot()
  })

  it(`should not preserve binding comments by default`, () => {
    expect.addSnapshotSerializer(createFixtureSerializer())

    expect(fixture).toMatchSnapshot()
  })

  it(`should not preserve binding comments if option is disabled`, () => {
    expect.addSnapshotSerializer(createFixtureSerializer({
      printComments: false
    }))

    expect(fixture).toMatchSnapshot()
  })

  it(`should preserve binding comments if option is enabled`, () => {
    expect.addSnapshotSerializer(createFixtureSerializer({
      printComments: true
    }))

    expect(fixture).toMatchSnapshot()
  })
})
