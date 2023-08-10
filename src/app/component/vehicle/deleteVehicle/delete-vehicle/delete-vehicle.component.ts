import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { vehicleService } from 'src/app/service/vehicle.service';
import { SnackbarService } from '../../../../service/snackbar.service';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service: vehicleService,private snackbarService: SnackbarService
  ) {}

  onConfirm(): void {
    console.log('confirm',this.data.code);
    // Close the dialog with true, indicating a confirmation.
    this.service.deleteVehicle(this.data.code).subscribe(res => {
      this.snackbarService.openSnackBar('Record deleted successfully', 'Close', 'success-snackbar');
       });
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog with false, indicating a cancellation.
    this.dialogRef.close(false);
  }
}
