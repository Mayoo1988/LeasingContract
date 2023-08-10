import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { CustomerService } from 'src/app/service/customer.service';
import {  ContractItem,Customer,Vehicle,CustomerEdit } from '../../../../Model/Master';
import { Observable, forkJoin,switchMap } from 'rxjs';
import { SnackbarService } from '../../../../service/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditCustomerComponent>, private buildr: FormBuilder,
    private service: CustomerService,private snackbarService: SnackbarService,private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Data',this.inputdata);
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata(code: any) {
    this.service.GetCustomerbyId(code).subscribe(item => {
      this.editdata = item;
      console.log('editdata',this.editdata);
      const formattedBirthDate = new Date(this.editdata.birthDate);
      this.myform.setValue({id: this.editdata.id === '' ? null : this.editdata.id
      ,firstName:this.editdata.firstName,lastName:this.editdata.lastName,birthDate:formattedBirthDate})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    id:this.buildr.control(''),
    firstName: this.buildr.control('',Validators.required),
    lastName: this.buildr.control('',Validators.required),
    birthDate: [null as Date | null]
  });

   // Mapping function to transform the form values to the desired format
   transformFormValues(formValues: any): any {
    const transformedData: any=[];

    const customer: Customer = {
      id:formValues.id ,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthDate: this.formatDateToArray(formValues.birthDate ?? null), // Assuming you want a constant value for "birthDate"
    };

     transformedData.customer = customer;

    return transformedData;
  }

  Saveuser() {
    console.log('value',this.myform.value,this.myform.valid);
    if (this.myform.valid) {
      if(this.inputdata.title=='Add Customer'){
        const formValues = this.myform.value;
        console.log('insert form value',this.myform.value);
        this.service.AddCustomer(formValues).subscribe(res => {
          this.snackbarService.openSnackBar('Record inserted successfully', 'Close', 'success-snackbar');
        this.closepopup();
       });
      }else{
        console.log('form value',this.myform.value);
        const formValues = this.myform.value;
        const transformedData = this.transformFormValues(formValues);
       // var data=this.formatDateToArray(this.myform.value.birthDate);
       // this.myform.value.birthDate= data;
       console.log('input data',transformedData);
      this.service.EditCustomer(transformedData.customer,transformedData.customer.id).subscribe(res => {
        this.snackbarService.openSnackBar('Record edited successfully', 'Close', 'success-snackbar');
      this.closepopup();
     });
    }
   }
  }

  formatBirthDate(birthDate: any): string {
    if (birthDate) {
      // Use the DatePipe to format the birth date (e.g., 'dd/MM/yyyy')
      return this.datePipe.transform(birthDate, 'dd/MM/yyyy') || '';
    }
    return '';
  }

  formatDateToArray(inputDate: string | null): number[] | null {
    if (!inputDate) {
      // If inputDate is null or undefined, return null
      return null;
    }
  
    const dateObject = new Date(inputDate);
    if (isNaN(dateObject.getTime())) {
      // Invalid input date, return null
      return null;
    }
  
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // JavaScript months are zero-based
    const day = dateObject.getDate();
  
    return [year, month, day];
  }
  
  
  
}
