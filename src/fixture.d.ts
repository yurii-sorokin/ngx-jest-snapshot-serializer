import { DebugNode } from './debug-node'

export declare class ComponentFixture<T = any> {
  componentRef: any
  ngZone: any | null
  debugElement: DebugNode
  componentInstance: T
  nativeElement: any
  elementRef: any
  changeDetectorRef: any
}
