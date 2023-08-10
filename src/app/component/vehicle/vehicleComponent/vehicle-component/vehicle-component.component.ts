import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractItem,ContractLength,Customer,vehicle } from 'src/app/Model/Master';
import { vehicleService } from 'src/app/service/vehicle.service';
import { DatePipe } from '@angular/common';
import {EditVehicleComponent} from 'src/app/component/vehicle/editVehicle/edit-vehicle-component/edit-vehicle-component.component';
import {DeleteVehicleComponent} from 'src/app/component/vehicle/deleteVehicle/delete-vehicle/delete-vehicle.component';

@Component({
  selector: 'app-vehicle-component',
  templateUrl: './vehicle-component.component.html',
  styleUrls: ['./vehicle-component.component.css']
})
export class VehicleComponent {
 
  vehiclelist !: vehicle[];
  dataSource: any;
  displayedColumns: string[] = ["brand", "model", "modelYear","vin","price", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  pageSizeOptions = [5, 10, 20];
  totalItems: number=0;
  currentPageSize : number = this.pageSizeOptions[0];
  currentPageIndex : number=0;

  constructor(private service: vehicleService, private dialog: MatDialog,private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadVehicle();
  }  

  loadVehicle() {
    this.service.getVehicle(this.currentPageSize, this.currentPageIndex).subscribe({
      next: (res) => {
        console.log('items',res);
        this.totalItems=res.numberOfItems;
        this.vehiclelist  = res.overviewItems;
        this.dataSource = new MatTableDataSource<vehicle>(this.vehiclelist);
       this.dataSource.sort = this.sort;
      },
      error: console.log,
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
    this.loadVehicle();
  }

  editVehicle(code: any) {
    this.Openpopup(code, 'Edit Vehicle',EditVehicleComponent);
  }

  addVehicle(code:any){
    this.Openpopup(code, 'Add Vehicle',EditVehicleComponent)
  }

  deleteVehicle(code: any) {
    console.log('inside')
    this.Openpopup(code, 'delete Vehicle',DeleteVehicleComponent);
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
      this.loadVehicle();
    })
  }

  formatBirthDate(birthDate: any): string {
    if (birthDate) {
      return this.datePipe.transform(birthDate, 'dd/MM/yyyy') || '';
    }
    return '';
  }

}
