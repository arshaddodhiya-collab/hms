export interface Patient {
  gender: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: Date;
  contactNumber: string;
  nationality: string;
  address: Address;
  permanentAddress?: Address;
  emergencyContacts?: EmergencyContact[];
}

export interface EmergencyContact {
  name: string;
  relation: string;
  contactNumber: string;
}

export interface Address {
  addressLine: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
}
