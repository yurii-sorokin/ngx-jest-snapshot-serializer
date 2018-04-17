// tslint:disable: max-classes-per-file no-input-rename
import { initHostFixture } from './framework/host'
import {
  Directive,
  Component,
  Input,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  NgModule
} from '@angular/core'
import { CommonModule } from '@angular/common'

describe(`Common`, () => {
  @Component({
    selector: '[tstWrapperContainer]',
    template: `<div class="wrapper">
    <ng-container *ngTemplateOutlet="template"></ng-container>
    </div>`
  })
  class WrapperContainerComponent {
    @Input() template
    @Input() text
  }

  @Directive({
    selector: '[tstWrapper]'
  })
  class WrapperDirective implements OnInit {
    @Input('tstWrapper') text

    private wrapperContainer: ComponentRef<WrapperContainerComponent>

    constructor(
      private templateRef: TemplateRef<any>,
      private viewContainerRef: ViewContainerRef,
      private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
      const containerFactory = this.componentFactoryResolver.resolveComponentFactory(WrapperContainerComponent)
      this.wrapperContainer = this.viewContainerRef.createComponent(containerFactory)
      this.wrapperContainer.instance.template = this.templateRef
    }
  }
  @NgModule({
    imports: [CommonModule],
    declarations: [WrapperDirective, WrapperContainerComponent],
    entryComponents: [WrapperContainerComponent],
    exports: [WrapperDirective, WrapperContainerComponent],
  })
  class WrapperModule { }

  it(`should print only wrapped content`, () => {
    const fixture = initHostFixture({
      imports: [WrapperModule],
      props: {
        wrapperText: 'wrapperText',
        text: 'content'
      },
      template:
        `<ng-container *tstWrapper="wrapperText"
        >
          <div>{{text}}</div>
        </ng-container>`
    })

    expect(fixture).toMatchSnapshot()
  })
})
