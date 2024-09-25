
interface Link {
  href: string;
  rel: string;
  templated: boolean;
}

export interface SelfData {
  associatedRoles: string[];
  bloodGroup: string;
  dateOfBirth: string;
  emailId: string;
  firstName: string;
  gender: string;
  lastName: string;
  links: Link[];
  mobileNumber: number;
  preferredLanguageId: string;
  preferredLanguageName: string;
  prefix: string;
  profilePicturePath: string;
  region: string[];
  userId: string;
  volunteerForBloodDonation: string; 
}
