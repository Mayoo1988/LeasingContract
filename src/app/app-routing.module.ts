import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path:'', loadChildren: () => import('../app/component/customers/customer.module').then(m => m.CustomersModule) },
  {path:'vehicle',loadChildren: () => import('../app/component/vehicle/vehicle.module').then(m => m.vehicleModule) },
  {path:'leasing',loadChildren: () => import('../app/component/leasingContract/leasingContractComponent/leasingContract.module').then(m => m.leasingContractModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
