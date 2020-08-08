import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import * as _moment from 'moment';
const moment = _moment; 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  totalCount: number = 0;
  constructor() { }
  dataSource = new MatTableDataSource<Grid>();
  displayedColumns: string[] = ["firstName","lastName","gender","dob","address"];
  ngOnInit() {
  }

}
export interface Grid {
  id:string;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;  
  dob: string;

}