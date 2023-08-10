import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractItem,ContractLength,Customer } from 'src/app/Model/Master';
import { MasterService } from 'src/app/service/master.service';
import { DatePipe } from '@angular/common';
import {EditCustomerComponent} from 'src/app/component/customers/editCustomerComponent/edit-customer/edit-customer.component';
import {DeleteCustomerComponent} from 'src/app/component/customers/deleteCustomer/delete-customer/delete-customer.component';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
 
  customerlist !: Customer[];
  dataSource: any;
  displayedColumns: string[] = ["firstName", "lastName", "birthDate", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  pageSizeOptions = [5, 10, 20];
  totalItems: number=0;
  currentPageSize : number = this.pageSizeOptions[0];
  currentPageIndex : number=0;

  constructor(private service: MasterService, private dialog: MatDialog,private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadcustomer();
  }  

  loadcustomer() {
    this.service.getCustomer(this.currentPageSize, this.currentPageIndex).subscribe({
      next: (res) => {
        console.log('items',res);
        this.totalItems=res.numberOfItems;
        this.customerlist  = res.overviewItems;
        this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
       this.dataSource.sort = this.sort;
      }
  });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onPaginatorChange(event: PageEvent): void {
    console.log('event',event)
    this.currentPageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    // Reload data when the page size or index changes.
    this.loadcustomer();
  }

  editCustomer(code: any) {
    this.Openpopup(code, 'Edit Customer',EditCustomerComponent);
  }

  addCustomer(code:any){
    this.Openpopup(code, 'Add Customer',EditCustomerComponent)
  }

  deleteCustomer(code: any) {
    console.log('inside')
    this.Openpopup(code, 'delete Customer',DeleteCustomerComponent);
  }

  detailcustomer(code: any) {
    //this.Openpopup(code, 'Customer Detail',UserdetailComponent);
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadcustomer();
    })
  }

  formatBirthDate(birthDate: any): string {
    if (birthDate) {
      return this.datePipe.transform(birthDate, 'dd/MM/yyyy') || '';
    }
    return '';
  }

}

