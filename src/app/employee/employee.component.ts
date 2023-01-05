import { Component, OnInit, Self } from '@angular/core';
import { RoomServiceService } from '../rooms/services/room-service.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  //providers: [RoomServiceService]
})
export class EmployeeComponent implements OnInit {

  empName: string = "John";

  //@Self() resolution modifier ,the service should be registered here
  constructor(private service: RoomServiceService) { }

  ngOnInit(): void {
  }

}
