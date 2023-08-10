import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { CustomerService } from 'src/app/service/customer.service';
import { SnackbarService } from '../../../../service/snackbar.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service: CustomerService,private snackbarService: SnackbarService
  ) {}

  onConfirm(): void {
    console.log('confirm',this.data.code);
    // Close the dialog with true, indicating a confirmation.
    this.service.DeleteCustomer(this.data.code).subscribe(res => {
      this.snackbarService.openSnackBar('Record deleted successfully', 'Close', 'success-snackbar');
       });
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog with false, indicating a cancellation.
    this.dialogRef.close(false);
  }
}
