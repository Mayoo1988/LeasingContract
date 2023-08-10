import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-leasing-contract-detail',
  templateUrl: './leasing-contract-detail.component.html',
  styleUrls: ['./leasing-contract-detail.component.css']
})
export class LeasingContractDetailComponent implements OnInit {

  inputdata: any;
  custdata: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<LeasingContractDetailComponent>,
    private service: MasterService) {


  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.service.GetContractbycode(this.inputdata.code).subscribe(item => {
        this.custdata = item;
      });
    }
  }

  closepopup(){
    this.ref.close('closing from detail');
  }
}
