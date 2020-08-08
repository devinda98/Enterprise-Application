import { Component, Inject, ViewChild, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from '@angular/forms';
import { GadgetTracerLogService } from "./gadget-tracer-log.service";
import { CrudUiComponent, FormMode } from "./CRUD-UI/gadget-tracer-log-crud.componant";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import * as _moment from 'moment';
const moment = _moment; 


@Component({
  selector: 'lib-gadget-tracer-log',
  templateUrl: './gadget-tracer-log.component.html',
  styleUrls: ['./gadget-tracer-log.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GadgetTracerLogComponent implements OnInit {

  severityObject: any = {};
  filterForm: FormGroup;
  searchResultMessage: string;
  showProgressBar: boolean = false;
  totalCount: number = 0;
  allSymptomCodes: Grid[] = [];
  allDistrict: District[];
  districtList: any = [];
  mode: FormMode = FormMode.NEW;
  SymptomRecord: Grid;
  symptomConfigRecordForm : FormGroup;
  id:String;
  hideFilters: boolean = false;
  users: Grid[];
  
  dataSource = new MatTableDataSource<Grid>();
  displayedColumns: string[] = ["firstName","lastName","gender","dob","address"];
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private GadgetTracerLogService: GadgetTracerLogService) {
    this.filterForm = fb.group({
      firstName: null,
      gender: null,
      dateTo:null,
      dateFrom:null,
      lastName: null,
      district: null,
    });
    
  }
  ngOnInit() : void{
    this.symptomConfigRecordForm = new FormGroup({
      district: new FormControl()
    });

    if (this.mode == FormMode.UPDATE) {
      this.GadgetTracerLogService.getUserDetails(this.id).subscribe((data: any) => {
        this.SymptomRecord = data;
        this.symptomConfigRecordForm.get("district").setValue(data.Grid.district);
      });
    }
    
    this.load();
  }


  load(){
    this.symptomConfigRecordForm = this.fb.group({
      name: ['']
    });
    this.getAllUsers();
    this.getDistricts();
  }


    getDistricts(){
    let ele: any;
    this.GadgetTracerLogService.getDistricts()
      .subscribe(
        (data: any) => {
          this.allDistrict = data.list as District[];
          this.allDistrict.forEach(element => {
            this.districtList.push(element);
          });
        }
      );
  }
  getAllUsers() {
    console.log("GetUserById method fired");
    this.searchResultMessage = null;
    this.dataSource.data = [];
    this.showProgressBar = true;
    
    var requestObj = {
    first: ((this.paginator.pageSize * (this.paginator.pageIndex + 1)) - (this.paginator.pageSize) + 1) + '',
    maxResults: this.paginator.pageSize + ''
    }
    
    if (this.filterForm.value.name) {
    requestObj["name"] = this.filterForm.value.name.trim();
    }
    
    this.GadgetTracerLogService.getUserDetails(requestObj)
    .subscribe(
    (data: any) => {
    console.log("EmployeeJSon",data);
    this.dataSource.data = data.UserData as Grid[];
    if (data) {
    if (data.noOfRecords == 0) {
    this.searchResultMessage = "No Data Available!";
    this.totalCount = 0;
    this.showProgressBar = false;
    } else {
    this.allSymptomCodes = data.UserData as Grid[];
    this.dataSource.data = data.UserData as Grid[];
    this.totalCount = data.noOfRecords || this.totalCount;
    this.showProgressBar = false;
    }
    }
    },
    error => {
    }
    );
    }
 
  openCreateDialog(): void {
    const activeModal = this.dialog.open(CrudUiComponent, {
      width: "95%",
      maxWidth: "100vw",
      maxHeight: "100vh",
      disableClose: true
    });
  }
  updateSymptomCodeConfigDialog(row: any) {
    const activeModal = this.dialog.open(CrudUiComponent, {
      width: "95%",
      maxWidth: "100vw",
      maxHeight: "100vh",
      disableClose: true
    });
    activeModal.componentInstance.mode = FormMode.UPDATE;
    activeModal.componentInstance.id = row.id;
    activeModal.componentInstance.reload.subscribe(this.load.bind(this));
    activeModal.componentInstance.isOnViewMode = true;
    activeModal.componentInstance.load();
  }

  search() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.getFilteredUsers();
  }
  getFilteredUsers() {
    this.searchResultMessage = null;
    this.dataSource.data = [];
    this.showProgressBar = true;

    var requestObj = {
      first: ((this.paginator.pageSize * (this.paginator.pageIndex + 1)) - (this.paginator.pageSize) + 1) + '',
      maxResults: this.paginator.pageSize + ''
    }

    if (this.filterForm.value.firstName) {
      requestObj["firstName"] = this.filterForm.value.firstName.trim();
    }

    if (this.filterForm.value.lastName) {
      requestObj["lastName"] = this.filterForm.value.lastName.trim();
    }

    if (this.filterForm.value.gender) {
      requestObj["gender"] = this.filterForm.value.gender.trim();
    }
    if (this.filterForm.value.dateTo) {
      requestObj["dateTo"] = moment(this.filterForm.value.dateTo).format('YYYY-MM-DD');
    }
    if (this.filterForm.value.dateFrom) {
      requestObj["dateFrom"] = moment(this.filterForm.value.dateFrom).format('YYYY-MM-DD');
    }
    if (this.filterForm.value.district) {
      requestObj["district"] = this.filterForm.value.district.trim();
    }

    this.GadgetTracerLogService.getFilteredUserList(requestObj)
      .subscribe(
        (data: any) => {
          this.dataSource.data = data.userList as Grid[];
          if (data) {
            if (data.noOfRecords == 0) {
              this.searchResultMessage = "No Data Available!";
              this.totalCount = 0;
              this.showProgressBar = false;
            } else {
              this.dataSource.data = data.userList as Grid[];
              this.totalCount = data.noOfRecords || this.totalCount;
              this.showProgressBar = false;
            }
          }
        })
  }
  radioChange(e) {
    this.filterForm.get("gender").setValue(e.value);
  }

  getDistrict(e) {
    this.filterForm.get("district").setValue(e);
  }
}

export interface Grid {
  id:string;
  firstName: string;
  lastName: string;
  dateTo: string;
  dateFrom: string;
  gender: string;
  address: string;  
  skill: string;
  contactNo: string;
  dob: string;
  district: string;
}
export interface District {
  id: string;
  district: string;
}



