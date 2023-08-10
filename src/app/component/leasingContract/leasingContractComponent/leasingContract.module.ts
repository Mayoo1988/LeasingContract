// customers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingContractComponent } from './leasing-contract/leasing-contract.component';
import { LeasingContractEditComponent } from './leasingContractEdit/leasing-contract-edit/leasing-contract-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; // Add this line
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { LeasingContractAddComponent } from './leasingContractAdd/leasing-contract-add/leasing-contract-add.component';
import { LeasingContractDeleteComponent } from './leasingContractDelete/leasing-contract-delete/leasing-contract-delete.component';
import { LeasingContractDetailComponent } from './leasingContractDetail/leasing-contract-detail/leasing-contract-detail.component';
@NgModule({
  declarations: [LeasingContractComponent,LeasingContractEditComponent, LeasingContractAddComponent, LeasingContractDeleteComponent, LeasingContractDetailComponent],
  imports: [CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: LeasingContractComponent,
          children: [
            {
              path: 'edit',
              component: LeasingContractEditComponent,
            }]
        }]),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,MatTableModule,MaterialModule,
    ReactiveFormsModule,
    FormsModule,MatInputModule,DatePipe],
  exports: [],
})
export class leasingContractModule {}
