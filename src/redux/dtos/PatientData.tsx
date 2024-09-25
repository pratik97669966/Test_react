export interface PatientData {
  selected: boolean | undefined;
  familyMemberId: string;
  patientAppUserId: string;
  parentPatientMobileNo: number;
  relationInfo: {
    relationId: string;
    relationName: string;
  };
  dateOfBirth: number;
  gender: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  s3FamilyMemberPhotoPath: string;
  bloodGroup: string;
  location: string;
  uniquePatientNumber: string[];
  officeId: string | null;
  email: string;
  kinName: string;
  kinMobileNumber: number;
  patientAddress: string;
  age: number | null;
  active: boolean;
  links: {
    rel: string;
    href: string;
  }[];
}
export interface RelationInfo {
  relationId?: string;
  relationName?: string;
}