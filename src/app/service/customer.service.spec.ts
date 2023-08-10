import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import {Customer} from '../Model/Master';
import{environment} from '../../enviornment';

describe('customerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a customer', () => {
    const customerData: Customer[] = [
        { id: null, firstName: 'ABC', lastName: 'XYZ', birthDate: [1989, 1, 29] }
      ];
    
    service.AddCustomer(customerData).subscribe(response => {
      expect(response).toEqual(customerData); // Adjust as per your response structure
    });

    const req = httpMock.expectOne(environment.baseUrl +"customer/");
    expect(req.request.method).toBe('POST');
    req.flush(customerData); // Mock the response
  });

  it('should edit a customer', () => {
    const customerId = 10; // Replace with a valid customer ID
    const customerData: Customer[] = [
        {
            "id":10,"firstName":"Priyanks","lastName":"Mane","birthDate":[1989,1,29]
        }
    ];
  
    service.EditCustomer(customerData, customerId).subscribe(response => {
      expect(response).toEqual(customerData); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"customer/"+customerId);
    expect(req.request.method).toBe('PUT');
    req.flush(customerData); // Mock the response
  });

  it('should delete a customer', () => {
    const customerId = 10; // Replace with a valid customer ID
  
    service.DeleteCustomer(customerId).subscribe(response => {
      expect(response).toBeNull(); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"customer/"+customerId);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Mock the response
  });

  it('should get customer by ID', () => {
    const customerId = 10; // Replace with a valid customer ID
    const mockCustomer = {
        "id": 10,
        "firstName": "Mayur",
        "lastName": "Mane",
        "birthDate": [
            1989,
            5,
            29
        ]
    };
  
    service.GetCustomerbyId(customerId).subscribe(response => {
      expect(response).toEqual(mockCustomer); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"customer/"+customerId);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer); // Mock the response
  });
});
