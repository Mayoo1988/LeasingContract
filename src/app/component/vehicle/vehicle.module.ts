// customers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from '../vehicle/vehicleComponent/vehicle-component/vehicle-component.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; // Add this line
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditVehicleComponent } from './editVehicle/edit-vehicle-component/edit-vehicle-component.component';
import { DeleteVehicleComponent } from './deleteVehicle/delete-vehicle/delete-vehicle.component';

@NgModule({
  declarations: [VehicleComponent,EditVehicleComponent,DeleteVehicleComponent],
  imports: [CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: VehicleComponent,
        }]),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,MatTableModule,MaterialModule,
    ReactiveFormsModule,
    FormsModule],
  exports: [],
})
export class vehicleModule {}
