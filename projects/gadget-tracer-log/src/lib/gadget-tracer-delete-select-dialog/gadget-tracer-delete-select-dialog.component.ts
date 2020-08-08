import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-gadget-tracer-delete-select-dialog',
  templateUrl: './gadget-tracer-delete-select-dialog.component.html',
  styleUrls: ['./gadget-tracer-delete-select-dialog.component.scss']
})
export class GadgetTracerDeleteSelectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GadgetTracerDeleteSelectDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

}
