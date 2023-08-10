import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import {  ContractItem,ContractLength,Customer } from '../Model/Master';
import { vehicle } from '../Model/Master';
import{environment} from '../../enviornment';

@Injectable({
  providedIn: 'root'
})
export class vehicleService {
  constructor(private http: HttpClient) { }


  addVehicle(data:any){
    return this.http.post(environment.baseUrl +"vehicle/", data);
  }

  editVehicle(data:any,id:any){
    return this.http.put(environment.baseUrl +"vehicle/"+ id, data);
  }

  deleteVehicle(id:any){
    return this.http.delete(environment.baseUrl +"vehicle/"+id);
  }

  getVehiclebyId(code:any){
    return this.http.get(environment.baseUrl +"vehicle/"+ code);
  }

  getVehicle(Pagesize:number,PageIndex:number):Observable<{numberOfItems:number, overviewItems: vehicle[] }>{
    return this.http.get<{numberOfItems:number, overviewItems: vehicle[] }>(environment.baseUrl + `vehicles?page=${PageIndex}&size=${Pagesize}`);
  }

}
