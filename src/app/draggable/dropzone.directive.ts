import { Directive, OnInit, HostBinding, HostListener, Output, EventEmitter, SkipSelf } from '@angular/core';
import { DroppableService } from './droppable.service';

@Directive({
  selector: '[appDropzone]',
  providers:[DroppableService]
})
export class DropzoneDirective implements OnInit{

  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop = new EventEmitter<PointerEvent>();
  @Output() remove = new EventEmitter<PointerEvent>();

  constructor(@SkipSelf() private  allDroppableService: DroppableService, private  innerDroppableService: DroppableService) { }
  
  ngOnInit(): void {
    this.allDroppableService.dragStart$.subscribe(() => this.onDragStart())
    this.allDroppableService.dragEnd$.subscribe((event) => this.onDragEnd(event))

    this.innerDroppableService.dragStart$.subscribe(() => this.onInnerDragStart())
    this.innerDroppableService.dragEnd$.subscribe((event) => this.onInnerDragEnd(event))
  }

  @HostListener('pointerenter') onPointerEnter(): void{
    if(!this.activated){
      return;
    }
     this.entered = true;
  }

  @HostListener('pointerleave') onPointerLeave(): void{
    if(!this.activated){
      return;
    }
    this.entered = false;
  }

  private onDragStart(): void{
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void{
    if(!this.activated){
      return;
    }
    if(this.entered){
      this.drop.emit(event)
    }
    this.activated = false;
    this.entered = false;
  }

  private onInnerDragStart(): void{
    this.entered = true;
    this.activated = true;
  }

  private onInnerDragEnd(event: PointerEvent): void{
    if(!this.entered){
      this.remove.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }

}
