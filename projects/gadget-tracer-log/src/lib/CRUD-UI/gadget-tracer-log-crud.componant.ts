import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { GadgetTracerLogService } from '../gadget-tracer-log.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GadgetPopupDialogComponent} from '../Popup-UI/gadget-tracer-log-popup.component';
import { Grid,District } from 'projects/gadget-tracer-log/src/lib/gadget-tracer-log.component';
import { GadgetTracerDeleteSelectDialogComponent } from '../gadget-tracer-delete-select-dialog/gadget-tracer-delete-select-dialog.component';
import * as _moment from 'moment';
const moment = _moment; 


@Component({
    selector: 'CRUD-UI',
    templateUrl: './gadget-tracer-log-crud.componant.html',
    styleUrls: ['./gadget-tracer-log-crud.componant.scss']
  })
  export class CrudUiComponent implements OnInit {
  
    title: string;
    showProgressBar: boolean = false;
    titleDisplay: boolean = true;
    mode: FormMode = FormMode.NEW;
    id: String;
    SymptomRecord: Grid;
  symptomConfigRecordForm : FormGroup;
    skilltemp: String;
    formMode = FormMode;
    allDistrict: District[];
    districtList: any = [];
    userCreateForm: FormGroup;
    UserRecord: Grid;
    reload: EventEmitter<string> = new EventEmitter();
    isOnViewMode = false;
    existMessage: string = "";
    showFormContent: boolean = true;
    isExist: boolean = false;
    marked = false;
    
    constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<CrudUiComponent>, private dialog: MatDialog, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private GadgetTracerLogService: GadgetTracerLogService, ) {
    
    }
  
    ngOnInit() {
      
      this.userCreateForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        dob: new FormControl(),
        contactNo: new FormControl(),
        address: new FormControl(),
        gender: new FormControl(),
        dateTo: new FormControl(),
       dateFrom: new FormControl(),
        district: new FormControl(),
        skill: new FormControl()
      });


      if (this.mode == FormMode.UPDATE) {
        this.GadgetTracerLogService.getUserById(this.id).subscribe((data: any) => {
          this.UserRecord = data;
  
          console.log("data.userUser :", data.users)
  
          this.userCreateForm.get("firstName").setValue(data.users[0].firstName);
          this.userCreateForm.get("lastName").setValue(data.users[0].lastName);
          this.userCreateForm.get("contactNo").setValue(data.users[0].contactNo);
          this.userCreateForm.get("address").setValue(data.users[0].address);
          this.userCreateForm.get("district").setValue(data.users[0].district);
          this.userCreateForm.get("skill").setValue(data.users[0].skill);
          this.userCreateForm.get("gender").setValue(data.users[0].gender);
          this.userCreateForm.get("dateFrom").setValue(data.users[0].dateFrom);
          this.userCreateForm.get("dateTo").setValue(data.users[0].dateTo);
          this.userCreateForm.get("dob").setValue(data.users[0].dob);
  
          
        });
      }
      this.getDistricts();
      
    }
   
    radioChange(e) {
      this.userCreateForm.get("gender").setValue(e.value);
    }
    getDistrict(e) {
      this.userCreateForm.get("district").setValue(e);
    }
    getFromDate(type: string, event: MatDatepickerInputEvent<Date>) {
      this.userCreateForm.get("dateFrom").setValue(event.value);
    }
  
    getToDate(type: string, event: MatDatepickerInputEvent<Date>) {
      this.userCreateForm.get("dateTo").setValue(event.value);
    }

    getDOB(type: string, event: MatDatepickerInputEvent<Date>) {
      this.userCreateForm.get("dob").setValue(event.value);
    }
  
  
    getSkills(e) {
      if (this.userCreateForm.get('skill').value != null) {
        if (e.checked == true) {
          this.skilltemp = this.skilltemp + "," + e.source.value;
          this.userCreateForm.get("skill").setValue(this.skilltemp);
        }
        else if (e.checked == false) {
          let skillArray = (this.skilltemp).split(",");
          let newString;
  
          for (var i = 0; i < (this.skilltemp).split(',').length; i++) {
            if (e.source.value == skillArray[i]) {
              skillArray[i] = "";
            }
  
            if (newString == null) {
              newString = skillArray[i];
            } else {
              newString = newString + ", " + skillArray[i]
            }
          }
          this.skilltemp = newString;
          this.userCreateForm.get("skill").setValue(this.skilltemp);
        }
      }
      else {
        this.userCreateForm.get("skill").setValue(e.source.value);
        this.skilltemp = this.userCreateForm.get('skill').value;
      }
    }
  
    save(options) {
      this.showProgressBar = true;
      this.showFormContent = false;
      this.isExist = false;
      if (this.mode == FormMode.NEW) {
        this.GadgetTracerLogService.createUser({
          firstName: this.userCreateForm.get('firstName').value,
          lastName: this.userCreateForm.get('lastName').value,
          dob: moment(this.userCreateForm.get('dob').value).format("YYYY-MM-DD"),
          gender: this.userCreateForm.get('gender').value,
          dateFrom: moment(this.userCreateForm.get('dateFrom').value).format("YYYY-MM-DD"),
          dateTo: moment(this.userCreateForm.get('dateTo').value).format("YYYY-MM-DD"),
          skill: this.userCreateForm.get('skill').value,
          district: this.userCreateForm.get('district').value,
          contactNo: this.userCreateForm.get('contactNo').value,
          address: this.userCreateForm.get('address').value,
        }).subscribe((data: any) => {
  
          if (data.status === "userExist") {
            this.isExist = true;
            this.existMessage = "User is already used !";
            this.showProgressBar = false;
            this.showFormContent = true;
          } else {
            if (options == 'exit') {
              this.reload.emit();
              this.showProgressBar = false;
              this.openDialogCreateSucess();
              this.dialogRef.close();
            } else {
              this.showProgressBar = false;
              this.showFormContent = true;
              this.openDialogCreateSucess();
              this.id = data.symptom.id;
              this.mode = FormMode.UPDATE
            }
          }
        },
          error => {
            console.log(error);
            this.openDialogFailed();
            this.showProgressBar = false;
            this.showFormContent = true;
          });
      }
      else {
        this.GadgetTracerLogService.createUser({
          id: this.id,
  
          firstName: this.userCreateForm.get('firstName').value,
          lastName: this.userCreateForm.get('lastName').value,
          dob: moment(this.userCreateForm.get('dob').value).format("YYYY-MM-DD"),
          dateTo: moment(this.userCreateForm.get('dateTo').value).format("YYYY-MM-DD"),
          dateFrom: moment(this.userCreateForm.get('dateFrom').value).format("YYYY-MM-DD"),
          skill: this.userCreateForm.get('skill').value,
          district: this.userCreateForm.get('district').value,
          gender: this.userCreateForm.get('gender').value,
          contactNo: this.userCreateForm.get('contactNo').value,
          address: this.userCreateForm.get('address').value,
  
        }).subscribe((data: any) => {
          if (data.status === "userExist") {
            this.isExist = true;
            this.existMessage = "User is already used !";
            this.showProgressBar = false;
            this.showFormContent = true;
          } else {
            if (options == 'exit') {
              this.reload.emit();
              this.showProgressBar = false;
              this.openDialogUpdateSucess();
              this.dialogRef.close();
            } else {
              this.showProgressBar = false;
              this.showFormContent = true;
              this.openDialogUpdateSucess();
            }
          }
        },
          error => {
            console.log(error);
            this.openDialogFailed();
            this.showProgressBar = false;
            this.showFormContent = true;
          });
      }
    }
    deleteUser(id: string) {
      this.GadgetTracerLogService.getUserById(this.id).subscribe((res: any) => {
        const dialogPrompt = this.dialog.open(GadgetTracerDeleteSelectDialogComponent, {
          width: '650px',
          data: "Do you want ​to​ Remove​ this User?",
          disableClose: true
        });
        dialogPrompt.afterClosed().subscribe(result => {
          this.titleDisplay = false
          this.title = 'DELETE USER '
          this.showProgressBar = true;
          this.showFormContent = false;
  
          if (result) {
            this.GadgetTracerLogService.deleteUser(this.id).subscribe((data: any) => {
              this.showProgressBar = false;
              this.dialogRef.close();
              this.reload.emit();
              this.openDialogDeleteSucess();
            }, error => {
              console.log(error);
              this.openDialogDeleteSucess();
            });
          } else {
            this.showProgressBar = false;
            this.showFormContent = true;
          }
        });
      });
    }
  
    getDistricts(){
      let ele: any;
      this.GadgetTracerLogService.getDistricts()
        .subscribe(
          (data: any) => {
            console.log("District",data);
            this.allDistrict = data.list as District[];
            this.allDistrict.forEach(element => {
              this.districtList.push(element);
            });
          }
        );
    }
    openDialogCreateSucess(): void {
      this.dialog.open(GadgetPopupDialogComponent, {
        width: '40%',
        data: "create"
      });
    }
    openDialogDeleteSucess(): void {
      this.dialog.open(GadgetPopupDialogComponent, {
        width: '40%',
        data: "delete"
      });
    }
  
    openDialogFailed(): void {
      this.dialog.open(GadgetPopupDialogComponent, {
        width: '40%',
        data: "failure",
      });
    }
  
    openDialogUpdateSucess(): void {
      this.dialog.open(GadgetPopupDialogComponent, {
        width: '40%',
        data: "update"
      });
    }
  
    toggleVisibility(e) {
      this.marked = e.target.checked;
    }
    cancel() {
      this.reload.emit();
      this.dialogRef.close();
  }
  load(){
    this.userCreateForm = this.fb.group({
      firstName: null,
      gender: null,
      lastName: null,
      dateFrom:null,
      dateTo:null,
      dob: null,
      district :null,
    });
    this.getDistricts();
  }

  }

  
  export enum FormMode {
    NEW, UPDATE
  } 
