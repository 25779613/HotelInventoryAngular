import { Inject, Injectable } from '@angular/core';
import { roomsList } from '../rooms';
import { environment } from '../../../environments/environment';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  //cashe request (share replay RxJs)
  //$ - denotes the property getRooms is a stream
  // can only modify streams with a function called pipe
  //header = new HttpHeaders({ 'token': 'JamesFranco' })// refer to get method
  getRooms$ = this.http.get<roomsList[]>('/api/rooms').pipe(
    shareReplay(1) // replay last record recieved
  );

  // roomsList: roomsList[] = [{
  //   roomNumber: 1,
  //   roomType: "Deluxe",
  //   amenities: "Air Conditioner, Free WI-FI, TV, Bathroom, Kitchen",
  //   price: 500,
  //   image: "assets/img/rooms/hotel.png",
  //   checkinTime: new Date("11-Nov-2022"),
  //   checkoutTime: new Date("12-Nov-2022"),
  //   rating: 4.5568784  // number: "1.1-1"  is the number pipe to format to round off to on decimal point = 4.6

  // },
  // {
  //   roomNumber: 4,
  //   roomType: "Deluxe",
  //   amenities: "Air Conditioner, Free WI-FI, TV, Bathroom, Kitchen",
  //   price: 1000,
  //   image: "assets/img/rooms/hotel.png",
  //   checkinTime: new Date("11-Nov-2022"),
  //   checkoutTime: new Date("12-Nov-2022"),
  //   rating: 3.4,

  // },
  // {
  //   roomNumber: 8,
  //   roomType: "Private Suite",
  //   amenities: "Air Conditioner, Free WI-FI, TV, Bathroom, Kitchen",
  //   price: 15000,
  //   image: "assets/img/rooms/hotel.png",
  //   checkinTime: new Date("11-Nov-2022"),
  //   checkoutTime: new Date("12-Nov-2022"),
  //   rating: 2.6,

  // }]
  roomsList: roomsList[] = [];

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    console.log(this.config.apiEndpoint);
    console.log("room service init");
  }

  getRooms() {
    //Create Httpheader to pass additional information
    const headers = new HttpHeaders({ 'token': 'jamesFranco' })

    // due to the proxy con dont have to insert full url, just the endpoint
    // in order to get the data in a specific format @the get in <> specify the object type to be formatted in
    return this.http.get<roomsList[]>('/api/rooms', { headers: headers });
  }

  // never add an array of data do it individually i
  addRoom(room: roomsList) {
    return this.http.post<roomsList[]>('/api/rooms', room);
  }

  updateRoom(room: roomsList) {
    return this.http.put<roomsList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<roomsList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    });
    return this.http.request(request);
  }
}
