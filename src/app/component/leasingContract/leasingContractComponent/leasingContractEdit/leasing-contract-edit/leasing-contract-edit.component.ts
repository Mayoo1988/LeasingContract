import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import {  ContractItem,Customer,Vehicle } from '../../../../../Model/Master';
import { Observable, forkJoin,switchMap,mergeMap } from 'rxjs';
import { SnackbarService } from '../../../../../service/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leasing-contract-edit',
  templateUrl: './leasing-contract-edit.component.html',
  styleUrls: ['./leasing-contract-edit.component.css']
})
export class LeasingContractEditComponent implements OnInit {
  inputdata: any;
  editdata: any;
  birtdate!:number[];
  namelist !:string[];
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<LeasingContractEditComponent>, private buildr: FormBuilder,
    private service: MasterService,private snackbarService: SnackbarService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata(code: any) {
    this.service.GetContractbycode(code).subscribe(item => {
      this.editdata = item;
      this.birtdate=this.editdata.customer.birthDate;
      this.myform.setValue({contractNo:this.editdata.id,monthlyRate:this.editdata.monthlyRate,firstname:this.editdata.customer.firstName,lastName:this.editdata.customer.lastName,
      brand:this.editdata.vehicle.brand ,model:this.editdata.vehicle.model,year:this.editdata.vehicle.modelYear,vin:this.editdata.vehicle.vin,price:this.editdata.vehicle.price})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    contractNo: this.buildr.control('',Validators.required),
    monthlyRate: this.buildr.control('',Validators.required),
    firstname: this.buildr.control('',Validators.required),
    lastName: this.buildr.control('',Validators.required),
    brand: this.buildr.control('',Validators.required),
    model: this.buildr.control('',Validators.required),
    year: this.buildr.control('',Validators.required),
    vin: this.buildr.control('',Validators.required),
    price: this.buildr.control('',Validators.required)
  });

   // Mapping function to transform the form values to the desired format
   transformFormValues(formValues: any): any {
    const transformedData: any = {
      contractNumber: formValues.contractNo,
      monthlyRate: formValues.monthlyRate,
    };

    const vehicle: Vehicle = {
      brand: formValues.brand,
      model: formValues.model,
      modelYear: formValues.year,
      vin: formValues.vin, // Assuming you want a constant value for "vin"
      price: formValues.price // Assuming you want a constant value for "price"
    };

    transformedData.vehicle = vehicle;

    const customer: Customer = {
      id:null,
      firstName: formValues.firstname,
      lastName: formValues.lastName,
      birthDate: this.birtdate, // Assuming you want a constant value for "birthDate"
    };
    transformedData.customer = customer;

    return transformedData;
  }

  Saveuser() {
    if (this.myform.valid) {
      const formValues = this.myform.value;
      const transformedData = this.transformFormValues(formValues);
      this.service.Savecontract(transformedData,this.myform.value.contractNo).subscribe(res => {
        this.snackbarService.openSnackBar('Record edited successfully', 'Close', 'success-snackbar');
      this.closepopup();
     });
   }
  }
}
