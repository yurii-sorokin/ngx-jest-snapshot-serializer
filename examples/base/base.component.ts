import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'xmpl-base',
  templateUrl: './base.component.html'
})
export class BaseComponent {
  @Input() promiseValue = Promise.resolve(1);
  @Input() observableValue = Observable.of(2);
  @Input() twoWayValue = 3;

  @HostBinding('class.bound')
  bound = true;
  @HostBinding('class.not-bound')
  notBound = false;
  @HostBinding('attr.title')
  title = 'super';
  @HostBinding('style.overflow')
  overflow = 'hidden';
  @HostBinding('style.display')
  get display() { return 'block'; }
  @HostBinding('disabled')
  get disabled() { return false; }

  ifPass = true;
  ifNotPass = false;

  doStuff() {}
}
