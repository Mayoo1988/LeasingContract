import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from '../../enviornment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }


  AddCustomer(data:any){
    return this.http.post(environment.baseUrl +"customer/", data);
  }

  EditCustomer(data:any,id:any){
    return this.http.put(environment.baseUrl +"customer/"+ id, data);
  }

  DeleteCustomer(id:any){
    return this.http.delete(environment.baseUrl +"customer/"+id);
  }

  GetCustomerbyId(code:any){
    return this.http.get(environment.baseUrl +"customer/"+ code);
  }

}
