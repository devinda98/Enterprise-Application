import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: 'app-quantity-manager',
  templateUrl: './quantity-manager.component.html',
  styleUrls: ['./quantity-manager.component.css']
})
export class QuantityManagerComponent implements OnInit {

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