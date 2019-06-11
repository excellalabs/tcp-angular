import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'tcp-radio-group',
  providers: [{provide: MatFormFieldControl, useExisting: RadioGroupFormFieldComponent}],
})
export class RadioGroupFormFieldComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnInit, OnDestroy {

  private static nextId = 0;

  @HostBinding() id = `tcp-radio-group-${RadioGroupFormFieldComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input() name: string;
  @Input() formControlName: string;

  @Input()
  get value() {
    return this._value;
  }
  set value(newValue: any) {
    this._value = newValue;
    this.stateChanges.next();
  }
  private _value: any;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  focused: boolean;

  get empty(): boolean {
    return this._value === null;
  }

  shouldLabelFloat = true; // always
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = !!req;
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = !!value;
    this.stateChanges.next();
  }
  private _disabled = false;

  errorState: boolean = this.ngControl.valid;
  controlType? = 'radio-group';


  autofilled?: boolean;


  stateChanges = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  onChange: () => void;
  onTouched: () => void;

  ngOnInit() {}

  ngOnDestroy(): void {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
