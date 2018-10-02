import { Component, OnInit } from '@angular/core';
import { sortEvent } from '../draggable/sortable-list.directive';


function remove(item: string, list: string[]){
  if(list.indexOf(item) !== -1){
    list.splice(list.indexOf(item), 1);
  }
}
@Component({
  selector: 'app-g-main',
  templateUrl: './g-main.component.html',
  styleUrls: ['./g-main.component.scss']
})
export class GMainComponent implements OnInit {
  
  trappedBoxes = ['Trapped 1', 'Trapped 2'];

  sortableList = ['Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5','Box 6', 'Box 7', 'Box 8', 'Box 9', 'Box 10'];
  
  availableBoxes = ['Input File','Input Table','Map','Aggregate', 'Join', 'Filter', 'Output File', 'Output Table'];
  dropzone1 = []
  dropzone2 = ['Box 7']
  currentBox?: string;
  
  ngOnInit(): void {
    
  }
  add(): void{
    this.trappedBoxes.push('New Trapped');
  }
  
  sort(event: sortEvent){
  const current = this.sortableList[event.currentIndex];
  const swapWith = this.sortableList[event.newIndex];
  
  this.sortableList[event.newIndex] = current;
  this.sortableList[event.currentIndex] = swapWith;
  }
  
  move(box: string, toList: string[]): void {
    remove(box, this.availableBoxes);
    remove(box, this.dropzone1);
    remove(box, this.dropzone2);
  
    toList.push(box);
  
  }
}
