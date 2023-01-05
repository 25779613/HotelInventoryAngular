import { AfterViewChecked, AfterViewInit, DoCheck, OnDestroy, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { Room, roomsList } from './rooms';
import { RoomServiceService } from './services/room-service.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  hotelName: string = "Hilton Hotel"; // interpolation binding syntax , to use in html {{hotelName}}
  numberOfRooms: number = 10; // property binding syntax , to use in html  <div [innerText]="numberOfRooms"></div>

  selectedRoom!: roomsList; // not sure why theres an !sign here, error is not intialized if not used

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title: string = "Rooms List";
  roomsList: roomsList[] = [];
  //event binding syntax
  hideRooms: boolean = true;

  //creating observable

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    //observer.error('error');
  });



  // to pull data from another component only on child component will be referenced
  @ViewChild(HeaderComponent, { static: false }) headerComponent !: HeaderComponent;
  /*
  why make static false
  if theres async code that we are not sure will be available at the ngOnInit lifecycle hook
  and only will be available on/in ngAfterViewInit()
  */

  // to call child component multiple times
  @ViewChildren(HeaderComponent) headerChildrenComponent !: QueryList<HeaderComponent>;


  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Roomz List";
  }


  //to recieve output from child rooms-list
  selectRoom(room: roomsList) {
    this.selectedRoom = room;
  }


  // calling service - private roomservice: RoomServiceService
  //@SkipSelf() resolution modifier that service will not exists at this level in the dependancy resolution tree
  constructor(private roomservice: RoomServiceService) { }



  // it allows initial component to be initialized then initialize the second component to use its data
  //initalize the child component after parent component
  ngAfterViewInit(): void {
    this.headerComponent.title = "The rooms list";

    this.headerChildrenComponent.last.title = "Last title";
  }


  // ngDoCheck(): void {
  //   console.log("on changes is called");
  //   //listen to any changes made in the application

  // }

  //angular already completed one life cycle check
  ngAfterViewChecked(): void {

  }

  ngOnDestroy(): void {
    console.log("invoked!!!!!!!!!!!!!!!!");
    // unsubscribing from the data
    // whenever this component is destoryed unscubscribe from the data
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  totalBytes = 0;

  subscription !: Subscription; // variable to hold the subscription

  //subject is a base class for streams
  error$: Subject<string> = new Subject<string>();

  getError$ = this.error$.asObservable();
  // the room stream holds the data received from the getRooms stream
  //using pipe to catch error
  rooms$ = this.roomservice.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return of([]);

    })
  );

  // map operator RxJs
  roomsCount$ = this.roomservice.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  ngOnInit(): void {

    //completes a event from an api
    this.roomservice.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request made");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log("Response successful");
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }

      }
    });

    //using the obeservable item
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log("Completed"),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));



    // to pull data from endpoint you have to subscribe to it
    //getRooms$ pulls stream and stores the data once in cashe instead of mutliple pulls
    //this.subscription will hold the data

    // this.subscription = this.roomservice.getRooms$.subscribe(rooms => this.roomsList = rooms);



  }

  //adds a room to the tables
  addRoom() {
    const room: roomsList = {
      roomNumber: '11',
      roomType: "Deluxe",
      amenities: "Air Conditioner, Free WI-FI, TV, Bathroom, Kitchen",
      price: 5001,
      image: "assets/img/rooms/hotel.png",
      checkinTime: new Date("11-Nov-2022"),
      checkoutTime: new Date("12-Nov-2022"),
      rating: 4.5568784
    }
    //this.roomsList.push(room);

    //(spread opperator) need to return a new object for an onpush
    //this.roomsList = [...this.roomsList, room]; // creates a new array with the old arrays values and replaces it
    this.roomservice.addRoom(room).subscribe((data) => {
      this.roomsList = data; // assigning whatever data is being added to roomslist
    });
  }

  updateRoom() {
    const room: roomsList = {
      roomNumber: '3',
      roomType: "Deluxe",
      amenities: "Air Conditioner, Free WI-FI, TV, Bathroom, Kitchen",
      price: 1900,
      image: "assets/img/rooms/hotel.png",
      checkinTime: new Date("11-Nov-2022"),
      checkoutTime: new Date("12-Nov-2022"),
      rating: 4.5568784
    }
    this.roomservice.updateRoom(room).subscribe((data) => {
      this.roomsList = data; // assigning whatever data is being added to roomslist
    });

  }

  deleteRoom() {
    this.roomservice.deleteRoom("3").subscribe((data) => {
      this.roomsList = data; // assigning whatever data is being returned
    });
  }
}
