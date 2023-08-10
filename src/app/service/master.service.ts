import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import {  ContractItem,ContractLength,Customer,Vehicle } from '../Model/Master';
import{environment} from '../../enviornment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) { }


  getLeasingContract(Pagesize:number,PageIndex:number):Observable<{numberOfItems:number, overviewItems: ContractItem[] }>{
    return this.http.get<{numberOfItems:number, overviewItems: ContractItem[] }>(environment.baseUrl + `contractoverviews?page=${PageIndex}&size=${Pagesize}`);
  }
  
  getCustomer(Pagesize:number,PageIndex:number):Observable<{numberOfItems:number, overviewItems: Customer[] }>{
    return this.http.get<{numberOfItems:number, overviewItems: Customer[] }>(environment.baseUrl + `customers?page=${PageIndex}&size=${Pagesize}`);
  }

  Savecontract(data:any,id:any){
    console.log(data)
    return this.http.put(environment.baseUrl +"contract/"+id,data);
  }

  AddLeasingContract(data:any){
    console.log(data)
    return this.http.post(environment.baseUrl +"contract/",data);
  }
  
  AddVehicle(data:any){
    return this.http.post(environment.baseUrl +"vehicle/",data);
  }

  AddCustomer(data:any){
    return this.http.post(environment.baseUrl +"customer/",data);
  }

  DeleteContract(id:any){
    return this.http.delete(environment.baseUrl +"contract/"+id);
  }

  GetContractbycode(code:any){
    return this.http.get(environment.baseUrl +"contract/"+code);
  }

  GetCustomerbyId(code:any){
    return this.http.get(environment.baseUrl +"customer/"+ code);
  }

  getVehicle(Pagesize:number,PageIndex:number):Observable<{numberOfItems:number, overviewItems: Vehicle[] }>{
    return this.http.get<{numberOfItems:number, overviewItems: Vehicle[] }>(environment.baseUrl + `vehicles?page=${PageIndex}&size=${Pagesize}`);
  }

}
