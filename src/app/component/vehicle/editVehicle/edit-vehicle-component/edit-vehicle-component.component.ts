import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { vehicleService } from 'src/app/service/vehicle.service';
import { Observable, forkJoin,switchMap } from 'rxjs';
import { SnackbarService } from '../../../../service/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { vehicle } from 'src/app/Model/Master';

@Component({
  selector: 'app-edit-vehicle-component',
  templateUrl: './edit-vehicle-component.component.html',
  styleUrls: ['./edit-vehicle-component.component.css']
})
export class EditVehicleComponent {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditVehicleComponent>, private buildr: FormBuilder,
    private service: vehicleService,private snackbarService: SnackbarService,private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Data',this.inputdata);
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata(code: any) {
    this.service.getVehiclebyId(code).subscribe(item => {
      this.editdata = item;
      console.log('editdata',this.editdata);
      this.myform.setValue({id: this.editdata.id === '' ? null : this.editdata.id
      ,brand:this.editdata.brand,model:this.editdata.model,modelYear:this.editdata.modelYear,vin:this.editdata.vin,price:this.editdata.price})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    id:this.buildr.control(''),
    brand: this.buildr.control('',Validators.required),
    model: this.buildr.control('',Validators.required),
    modelYear: this.buildr.control('',Validators.required),
    vin: this.buildr.control('',Validators.required),
    price: this.buildr.control('',Validators.required)
  });

   // Mapping function to transform the form values to the desired format
   transformFormValues(formValues: any): any {
    const transformedData: any=[];

    const vehicle: vehicle = {
      id:formValues.id ,
      brand: formValues.brand,
      model: formValues.model,
      modelYear: formValues.modelYear,
      vin: formValues.vin,
      price: formValues.price
    };

     transformedData.vehicle = vehicle;

    return transformedData;
  }

  Saveuser() {
    console.log('value',this.myform.value,this.myform.valid);
    if (this.myform.valid) {
      if(this.inputdata.title=='Add Vehicle'){
        const formValues = this.myform.value;
        console.log('insert form value',this.myform.value);
        this.service.addVehicle(formValues).subscribe(res => {
          this.snackbarService.openSnackBar('Record inserted successfully', 'Close', 'success-snackbar');
        this.closepopup();
       });
      }else{
        console.log('form value',this.myform.value);
        const formValues = this.myform.value;
        const transformedData = this.transformFormValues(formValues);
       console.log('input data',transformedData);
      this.service.editVehicle(transformedData.vehicle,transformedData.vehicle.id).subscribe(res => {
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

