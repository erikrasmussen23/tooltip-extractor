import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip/tooltip';

@Directive({
  selector: '[myHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  private _tooltip : any; 
  @Input() defaultColor: string;

  @Input('myHighlight') set highlightColor(val: any){
    console.log(val);
    this._tooltip = val
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  @HostListener('contextmenu', ['$event']) onRightClick(event: any) {
    event.preventDefault();
    if(this._tooltip._isTooltipVisible()){
      window.prompt("Copy to clipboard: Ctrl+C, Enter", "text");
    }

    this.highlight( 'blue');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
