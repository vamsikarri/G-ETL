import { Directive, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter} from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { SortableDirective } from './sortable.directive';
import { createDirectiveInstance } from '@angular/core/src/view/provider';

export interface sortEvent{
  currentIndex: number;
  newIndex: number;
}
//use pythogorus
const distance = (rectA: ClientRect, rectB: ClientRect): number => {
return Math.sqrt(
  Math.pow(rectB.top - rectA.top ,2) + 
  Math.pow(rectB.left - rectA.left , 2)
)
}
@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit{

@ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

@Output() sort = new EventEmitter<sortEvent>();

private clientRects: ClientRect[];

ngAfterContentInit(): void{
  console.log(`Got ${this.sortables.length} sortables items.`);
  this.sortables.forEach(sortable => {
    sortable.dragStart.subscribe(()=> this.measureClientRects());
    sortable.dragMove.subscribe((event)=> this.detectSorting(sortable, event));
  })
}

private measureClientRects(){
console.log('Measure Client Rects.');
this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
}

private detectSorting(sortable: SortableDirective, event: PointerEvent){
/*console.log('Detect sorting....');
const currentIndex = this.sortables.toArray().indexOf(sortable);
const prevRect = currentIndex > 0 ? this.clientRects[currentIndex - 1] : undefined;
const nextRect = currentIndex < this.clientRects.length - 1 ? this.clientRects[currentIndex + 1] :undefined;

if(prevRect && event.clientY < prevRect.top + prevRect.height / 2){
  console.log('Move Back')
  this.sort.emit({
    currentIndex: currentIndex,
    newIndex: currentIndex - 1
  })
}
else if(prevRect && event.clientY > nextRect.top + nextRect.height / 2){
  console.log('Move forward')
  this.sort.emit({
    currentIndex: currentIndex,
    newIndex: currentIndex + 1
  })
}
console.log("Current Index", currentIndex);*/
//get all the client Rects
//sort them by distance to current sortable
//find first rect that we need to swap with
//stop
const currentIndex = this.sortables.toArray().indexOf(sortable);
const currentRect = this.clientRects[currentIndex];
this.clientRects.slice().sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect)).some(rect => {
  let needsSorting = false;
  if(rect === currentRect){
    return false;
  }

  const isHorizontal = rect.top === currentRect.top;
  const isBefore = isHorizontal ? rect.left < currentRect.left : rect.top < currentRect.top;

  let moveBack = false;
  let moveForward = false;

  if(isHorizontal){
    moveBack = isBefore && event.clientX < rect.left + rect.width / 2;
    moveForward = !isBefore && event.clientX > rect.left + rect.width / 2;
  } else{
    moveBack = isBefore && event.clientY < rect.top + rect.height / 2;
    moveForward = !isBefore && event.clientY > rect.top + rect.height / 2;
  }
  //find first rect that we need to swap with
  if(moveBack || moveForward){
    //do sorting
    console.log('do sorting!!');
    this.sort.emit({
      currentIndex: currentIndex,
      newIndex: this.clientRects.indexOf(rect)
    })
    return true;
  }
  return false;
});
}
}
