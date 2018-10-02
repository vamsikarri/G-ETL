import { Directive, EventEmitter, HostBinding, HostListener, Output, Input, TemplateRef, ViewContainerRef, ContentChild, ElementRef } from '@angular/core';
import { DraggableHelperDirective } from './draggable-helper.directive';

@Directive({
  selector: '[appDraggable],[appDroppable]'
})
export class DraggableDirective {

@HostBinding('class.draggable') draggable = true;
@HostBinding('class.dragging') dragging = false;

@Output() dragStart = new EventEmitter<PointerEvent>();
@Output() dragMove = new EventEmitter<PointerEvent>();
@Output() dragEnd = new EventEmitter<PointerEvent>();



constructor(public element: ElementRef){

}

//pointerdown => dragStart
@HostListener('pointerdown', ['$event']) 
onPointerDown(event: PointerEvent): void{
  this.dragging = true;
  event.stopPropagation();
  this.dragStart.emit(event);

}
//document => pointermove = > dragMove
@HostListener('document:pointermove', ['$event']) 
onPointerMove(event: PointerEvent): void{
  if(!this.dragging){
    return; 
  }
  this.dragMove.emit(event);
}
//document => pointerup => dragEnd
@HostListener('document:pointerup', ['$event']) 
onPointerUp(event: PointerEvent): void{
  if(!this.dragging){
    return; 
  }
  this.dragging = false;
  this.dragEnd.emit(event);
}

}
