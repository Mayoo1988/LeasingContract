export interface ContractItem {
    contractId: Int32Array,
    customerId:Int32Array,
    customerName: string,
    vehicleId:Int32Array,
    vehicleName: string;
    vin: string;
    monthlyRate: DoubleRange;

}

export interface Contract{
    contractNumber:string,
    monthlyRate:string,
    vehicle:{
    id:number,
    brand: string;
    model: string;
    modelYear: number;
    vin: string;
    price: number;
    },
    customer:{
    id:number,
    firstName: string;
    lastName: string;
    birthDate: number[];
    }
}

export interface Vehicle {
    brand: string;
    model: string;
    modelYear: string;
    vin: string;
    price: number;
  }

  export interface vehicle {
    id:number |null;
    brand: string;
    model: string;
    modelYear: number;
    vin: string;
    price: number;
  }

  export interface Customer {
    id:number |null;
    firstName: string;
    lastName: string;
    birthDate : number[] |null;
  }

  export interface CustomerEdit {
    firstName: string;
    lastName: string;
    birthDate: Date;
  }

  export interface ContractLength{
    numberOfPages: number,
    numberOfItems: number
  }