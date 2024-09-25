interface Link {
    href: string;
    rel: string;
    templated: boolean;
  }
  
 export interface UserServiceLocation {
    address: string;
    city: string;
    country: string;
    landmark: string;
    links: Link[];
    locality: string;
    parentPatientId: string;
    postalCode: string;
    state: string;
    type: string;
    userServiceLocationId: string;
  }