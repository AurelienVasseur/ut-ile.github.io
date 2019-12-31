import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialog/DialogData';

@Component({
  selector: 'app-dialog-disable-user',
  templateUrl: './dialog-disable-user.component.html',
  styleUrls: ['./dialog-disable-user.component.css']
})
export class DialogDisableUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDisableUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
