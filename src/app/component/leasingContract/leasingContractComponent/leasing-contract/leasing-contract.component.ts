import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractItem,ContractLength } from 'src/app/Model/Master';
import { MasterService } from 'src/app/service/master.service';
import { LeasingContractEditComponent } from '../leasingContractEdit/leasing-contract-edit/leasing-contract-edit.component';
import { LeasingContractAddComponent } from '../leasingContractAdd/leasing-contract-add/leasing-contract-add.component';
import { LeasingContractDetailComponent } from '../leasingContractDetail/leasing-contract-detail/leasing-contract-detail.component';
import { LeasingContractDeleteComponent } from '../leasingContractDelete/leasing-contract-delete/leasing-contract-delete.component';

@Component({
  selector: 'app-leasing-contract',
  templateUrl: './leasing-contract.component.html',
  styleUrls: ['./leasing-contract.component.css']
})
export class LeasingContractComponent {
 
  customerlist !: ContractItem[];
  dataSource: any;
  displayedColumns: string[] = ["ContractNo", "customerName", "vehicleName", "vin", "monthlyRate","vehiclePrice", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  pageSizeOptions = [5, 10, 20];
  totalItems: number=0;
  currentPageSize : number = this.pageSizeOptions[0];
  currentPageIndex : number=0;

  constructor(private service: MasterService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadcustomer();
  }  

  loadcustomer() {
    this.service.getLeasingContract(this.currentPageSize, this.currentPageIndex).subscribe({
      next: (res) => {
        console.log('items',res);
        this.totalItems=res.numberOfItems;
        this.customerlist  = res.overviewItems;
        this.dataSource = new MatTableDataSource<ContractItem>(this.customerlist);
       this.dataSource.sort = this.sort;
      }
  });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onPaginatorChange(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    // Reload data when the page size or index changes.
    this.loadcustomer();
  }

  editContract(code: any) {
    this.Openpopup(code, 'Edit Contract',LeasingContractEditComponent);
  }

  detailContract(code: any) {
    this.Openpopup(code, 'detail Contract',LeasingContractDetailComponent);
  }

  deleteContract(code: any) {
    this.Openpopup(code, 'delete Contract',LeasingContractDeleteComponent);
  }

  addcontract(type:string){
    this.Openpopup(0, 'Add Contract',LeasingContractAddComponent);
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
      this.loadcustomer();
    })
  }

}
