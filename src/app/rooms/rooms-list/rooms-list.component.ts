import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { roomsList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // updates the existing object only on push life cycle hook, needs to be immutable 
})
export class RoomsListComponent implements OnInit, OnChanges {

  //@Input to recieve data from parent component
  @Input() rooms: roomsList[] | null = []; // property global variable on the html tag to transfer data
  @Input() title: string = "";
  @Output() selectedRoom: EventEmitter<roomsList> = new EventEmitter<roomsList>(); // to send an object to parent
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }

    // detect changes to input values
  }

  ngOnInit(): void {
  }

  // send the object to the parent
  selectRoom(room: roomsList) {
    this.selectedRoom.emit(room);

  }

}
