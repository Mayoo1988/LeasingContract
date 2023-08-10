// customers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customerComponent/customers/customers.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; // Add this line
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCustomerComponent } from './editCustomerComponent/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './deleteCustomer/delete-customer/delete-customer.component';

@NgModule({
  declarations: [CustomersComponent,EditCustomerComponent,DeleteCustomerComponent],
  imports: [CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: CustomersComponent,
        }]),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,MatTableModule,MaterialModule,
    ReactiveFormsModule,
    FormsModule],
  exports: [],
})
export class CustomersModule {}
