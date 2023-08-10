import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { vehicleService } from './vehicle.service';
import { vehicle } from '../Model/Master';
import{environment} from '../../enviornment';

describe('vehicleService', () => {
  let service: vehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [vehicleService],
    });
    service = TestBed.inject(vehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a vehicle', () => {
    const vehicleData: vehicle[] = [
        { id:null,brand: "BMW", model: 'X4', modelYear: 2022, vin: "A123456",price: 45300.00 },
      ];
    
    service.addVehicle(vehicleData).subscribe(response => {
      expect(response).toEqual(vehicleData); // Adjust as per your response structure
    });

    const req = httpMock.expectOne(environment.baseUrl +"vehicle/");
    expect(req.request.method).toBe('POST');
    req.flush(vehicleData); // Mock the response
  });

  it('should edit a vehicle', () => {
    const vehicleId = 5; // Replace with a valid customer ID
    const vehicleData: vehicle[] = [
        {
            "id":5,"brand":"BMW","model":"X4","modelYear":2022,"vin":"A123456","price":45300.00
        }
    ];
  
    service.editVehicle(vehicleData, vehicleId).subscribe(response => {
      expect(response).toEqual(vehicleData); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"vehicle/"+vehicleId);
    expect(req.request.method).toBe('PUT');
    req.flush(vehicleData); // Mock the response
  });

  it('should delete a vehicle', () => {
    const vehicleId = 5; // Replace with a valid customer ID
  
    service.deleteVehicle(vehicleId).subscribe(response => {
      expect(response).toBeNull(); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"vehicle/"+vehicleId);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Mock the response
  });

  it('should get vehicle by ID', () => {
    const vehicleId = 1; // Replace with a valid customer ID
    const mockVehicle = {
        "id": 1,
        "brand": "BMW",
        "model": "X3",
        "modelYear": 2022,
        "vin": "A123456",
        "price": 45300.00
    };
  
    service.getVehiclebyId(vehicleId).subscribe(response => {
      expect(response).toEqual(mockVehicle); // Adjust as per your response structure
    });
  
    const req = httpMock.expectOne(environment.baseUrl +"vehicle/"+vehicleId);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicle); // Mock the response
  });
});
