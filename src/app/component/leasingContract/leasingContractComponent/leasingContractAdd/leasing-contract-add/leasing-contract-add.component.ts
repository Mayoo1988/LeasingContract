import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import {  ContractItem,Customer,Vehicle } from '../../../../../Model/Master';
import { Observable, forkJoin,switchMap,mergeMap,of } from 'rxjs';
import { SnackbarService } from '../../../../../service/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leasing-contract-add',
  templateUrl: './leasing-contract-add.component.html',
  styleUrls: ['./leasing-contract-add.component.css']
})
export class LeasingContractAddComponent implements OnInit {
  inputdata: any;
  editdata: any;
  birtdate!:number[];
  namelist !:string[];
  vehiclelist !:string[];
  Pagesize:number=100;
  PageIndex:number=0;
  selectedCustomer !: string;
  selectedVehicle !: string;

  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<LeasingContractAddComponent>, private buildr: FormBuilder,
    private service: MasterService,private snackbarService: SnackbarService) {

  }
  ngOnInit(): void {
    this.setpopupdata(this.data)
  }

  setpopupdata(code: any) {
    const firstObservable$: Observable<any> = this.service.getCustomer(this.Pagesize, this.PageIndex);
    const secondObservable$: Observable<any> = this.service.getVehicle(this.Pagesize, this.PageIndex);

  forkJoin([firstObservable$, secondObservable$]).pipe(
  switchMap(([firstResult, secondResult]) => {
    this.namelist = firstResult.overviewItems.map((customer: Customer) => customer.firstName + ' ' + customer.lastName);
    this.vehiclelist = secondResult.overviewItems.map((vehicle: Vehicle) => vehicle.brand + ' ' + vehicle.model+' '+vehicle.modelYear);
    return of(null);
   })
  ).subscribe(
   () => {
    // Success handling
   }
  );

  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    contractNo: this.buildr.control('',Validators.required),
    monthlyRate: this.buildr.control('',Validators.required),
    customername: this.buildr.control('',Validators.required),
    vehiclename: this.buildr.control('',Validators.required),
    birthDate:this.buildr.control('',Validators.required),
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
      brand: this.segregateString(formValues.vehiclename)[0],
      model: this.segregateString(formValues.vehiclename)[1],
      modelYear: this.segregateString(formValues.vehiclename)[2],
      vin: formValues.vin, // Assuming you want a constant value for "vin"
      price: formValues.price // Assuming you want a constant value for "price"
    };
    transformedData.vehicle = vehicle;

    const customer: Customer = {
      id:null,
      firstName: this.segregateString(formValues.customername)[0],
      lastName: this.segregateString(formValues.customername)[0],
      birthDate: this.formatDateToArray(formValues.birthDate) // Assuming you want a constant value for "birthDate"
    };
    transformedData.customer = customer;
    return transformedData;
  }

  Saveuser() {
        const formValues = this.myform.value;
        const transformedData = this.transformFormValues(formValues);
        const firstObservable$: Observable<any> = this.service.AddCustomer(transformedData.customer);
        const secondObservable$: Observable<any> = this.service.AddVehicle(transformedData.vehicle);
    
        forkJoin([firstObservable$ ,secondObservable$]).pipe(
          switchMap(([firstResult, secondResult]) =>  {
            transformedData.customer.id=firstResult.id;
            transformedData.vehicle.id=secondResult.id;
            console.log('data',transformedData);
            return this.service.AddLeasingContract(transformedData);
          })).subscribe(res => {
            this.snackbarService.openSnackBar('Record inserted successfully', 'Close', 'success-snackbar');
            this.closepopup();
       });
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

  segregateString(inputString: string): string[] {
    return inputString.split(' ');
  }
}
