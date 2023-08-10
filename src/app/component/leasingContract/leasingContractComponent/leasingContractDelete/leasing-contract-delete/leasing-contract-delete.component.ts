import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { SnackbarService } from '../../../../../service/snackbar.service';

@Component({
  selector: 'app-leasing-contract-delete',
  templateUrl: './leasing-contract-delete.component.html',
  styleUrls: ['./leasing-contract-delete.component.css']
})
export class LeasingContractDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<LeasingContractDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service: MasterService,private snackbarService: SnackbarService
  ) {}

  onConfirm(): void {
    console.log('confirm',this.data.code);
    // Close the dialog with true, indicating a confirmation.
    this.service.DeleteContract(this.data.code).subscribe(res => {
      this.snackbarService.openSnackBar('Record deleted successfully', 'Close', 'success-snackbar');
       });
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog with false, indicating a cancellation.
    this.dialogRef.close(false);
  }
}
