import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAppointmentStatus]',
})
export class AppointmentStatusDirective implements OnChanges {
  @Input('appAppointmentStatus') type!: 'New' | 'Follow-up';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    // Reset classes
    this.renderer.removeClass(this.el.nativeElement, 'bg-green-100');
    this.renderer.removeClass(this.el.nativeElement, 'bg-blue-100');
    this.renderer.removeClass(this.el.nativeElement, 'border-green-500');
    this.renderer.removeClass(this.el.nativeElement, 'border-blue-500');

    this.renderer.addClass(this.el.nativeElement, 'border-left-2');

    if (this.type === 'New') {
      this.renderer.addClass(this.el.nativeElement, 'bg-green-100');
      this.renderer.addClass(this.el.nativeElement, 'border-green-500');
      this.renderer.setStyle(
        this.el.nativeElement,
        'color',
        'var(--green-700)'
      );
    } else if (this.type === 'Follow-up') {
      this.renderer.addClass(this.el.nativeElement, 'bg-blue-100');
      this.renderer.addClass(this.el.nativeElement, 'border-blue-500');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'var(--blue-700)');
    }
  }
}
