export interface DoctorData {
  doctorId: string;
  appUserId: string;
  mobileNumber: number;
  firstName: string;
  lastName: string;
  registrationNumber: string;
  registrationMonth: number;
  registrationYear: number;
  specialitySet: Speciality[];
  qualificationDegreeSet: Qualification[];
  conductsOPDAtEntity: ConductsOPDAtEntity[];
  communicationType: any; // Update the type accordingly
  createdAt: number;
  lastModified: number;
  _links: Links;
}

interface Speciality {
  specialityId: string;
  name: string;
  primary: boolean;
}

interface Qualification {
  educationDegreeId: string;
  name: string;
  location: string;
  primary: boolean;
}

interface ConductsOPDAtEntity {
  entityId: string;
  entityCity: string;
  entityArea: string;
  appId: string | null;
  appDownloadLink: string | null;
}

interface Links {
  self: {
      href: string;
  };
}
