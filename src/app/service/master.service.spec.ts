import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MasterService } from './master.service';
import { Contract } from '../Model/Master';
import{environment} from '../../enviornment';

describe('contractService', () => {
  let service: MasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterService],
    });
    service = TestBed.inject(MasterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a contract', () => {
    const contractData: Contract[] = [
      {
        contractNumber: "A12",
        monthlyRate : "370.00",
        vehicle:{
        "id": 10,
        "brand": "XLR",
        "model": "X4",
        "modelYear": 2022,
        "vin": "A123456",
        "price": 45300.00
        },
        customer :{
        "id":12,"firstName":"Rahul","lastName":"Menon","birthDate":[1989,1,29]
        }
    }
      ];
    
    service.AddLeasingContract(contractData).subscribe(response => {
      expect(response).toEqual(contractData); // Adjust as per your response structure
    });

    const req = httpMock.expectOne(environment.baseUrl +"contract/");
    expect(req.request.method).toBe('POST');
    req.flush(contractData); // Mock the response
  });

  it('should edit a contract', () => {
    const contractId = 5; // Replace with a valid customer ID
    const contractData: Contract[] = [
      {
        contractNumber: "A12",
        monthlyRate : "370.00",
        vehicle:{
        "id": 10,
        "brand": "XLR",
        "model": "X4",
        "modelYear": 2022,
        "vin": "A123456",
        "price": 45300.00
        },
        customer :{
        "id":12,"firstName":"Rahul","lastName":"Menon","birthDate":[1989,1,29]
        }
    }
    ];
  
    service.Savecontract(contractData, contractId).subscribe(response => {
      expect(response).toEqual(contractData); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"contract/"+contractId);
    expect(req.request.method).toBe('PUT');
    req.flush(contractData); // Mock the response
  });

  it('should delete a contract', () => {
    const contractId = 5; // Replace with a valid customer ID
  
    service.DeleteContract(contractId).subscribe(response => {
      expect(response).toBeNull(); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"contract/"+contractId);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Mock the response
  });

  it('should get contract by ID', () => {
    const contractId = 1; // Replace with a valid customer ID
    const mockContract = {
      contractNumber: "A12",
      monthlyRate : "370.00",
      vehicle:{
      "id": 10,
      "brand": "XLR",
      "model": "X4",
      "modelYear": 2022,
      "vin": "A123456",
      "price": 45300.00
      },
      customer :{
      "id":12,"firstName":"Rahul","lastName":"Menon","birthDate":[1989,1,29]
      }
  };
  
    service.GetContractbycode(contractId).subscribe(response => {
      expect(response).toEqual(mockContract); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"contract/"+contractId);
    expect(req.request.method).toBe('GET');
    req.flush(mockContract); // Mock the response
  });
});
