import axios from '../axios/AxiosConfig';

export const addLoginInfo = (payload: any): Promise<any> => {
  return axios.post(`/createloginuser`, payload);
};
export const getAllProducts = (combopack: any): Promise<any> => {
  return axios.get(`/getAllProducts/${combopack}`,);
};
export const addnewData = (payload: any): Promise<any> => {
  return axios.get(`/createnewuser`, payload);
};
export const getSelfData = (): Promise<any> => {
  return axios.get('/userauth/users/me');
};
export const getFamilyMemberByMobileNumber = (mobileNumber: any): Promise<any> => {
  return axios.get(`/patient-service/patient/by-mobile-no/${mobileNumber}/family`);
};
export const makeSelfRelation = (patientAppUserId: string, firstName: string, lastName: string, mobileNumber: string,): Promise<any> => {
  return axios.post('patient-service/patient/' + patientAppUserId + '/family/self', {
    firstName: firstName,
    lastName: lastName,
    mobileNumber: mobileNumber
  });
};
export const logoutUser = (token: string): Promise<any> => {
  return axios.post('/userauth/users/logout', {
    token: token
  });
}
export const getDoctorData = (doctorId: string): Promise<any> => {
  return axios.get('/provider-service/doctor/by-id/' + doctorId);
};

export const getAllAddress = (parentPatientId: string): Promise<any> => {
  return axios.get(`/provider-service/get/all/address/${parentPatientId}`);
};

export const getActiveArea = (): Promise<any> => {
  return axios.get('/provider-service/getAll/active/serviceArea/cities');
};

export const getRecentUsedLocation = (parentPatientId: string): Promise<any> => {
  return axios.get(`/provider-service/get/recentUsed/location/${parentPatientId}`);
};

export const addRecentLocation = (paylod: any): Promise<any> => {
  return axios.post(`/provider-service/add/recent/location`,
    paylod
  );
};
export const addAddress = (paylod: any): Promise<any> => {
  return axios.post(`/provider-service/add/address`,
    paylod
  );
};
export const getRazorPayOrderId = (chatPaymentId: string, totalAmount: string): Promise<any> => {
  return axios.post(`/userauth/subscription/razorpay/chat-payment/initiate/${chatPaymentId}/${totalAmount}`);
};
export const getDoctorSlot = (payload: any): Promise<any> => {
  return axios.post(`/custom-booking-service/patient/online-consultation/slot-summary`, payload);
};
export const getDoctorFromPostalCode = (postalCode: String): Promise<any> => {
  return axios.get(`/provider-service/getAll/active/gp/form/passed/serviceArea/${postalCode}`);
};
export const searchSymptoms = (searchTerm: string): Promise<any> => {
  return axios.post('/master-service/cms/masters/symptom/search/by-name/', {
    searchTerm: searchTerm,
  });
};
export const getPaymentCharges = (patientMobileNumber: string, doctorId: string): Promise<any> => {
  return axios.post('/master-service/chat/charges/patient/get', {
    patientMobileNumber: patientMobileNumber,
    doctorId: doctorId
  });
};
export const bookConsultationAppointment = (payload: any): Promise<any> => {
  return axios.post('/custom-booking-service/online-appointment/',
    payload
  );
};
export const addExtraInfo = (payload: any): Promise<any> => {
  return axios.post('/custom-booking-service/online-appointment/add/booking/specific/address/and/extraInfo',
    payload
  );
};
export const appointmentStatusCheck = (payload: any): Promise<any> => {
  return axios.post('/custom-booking-service/online-appointment/status',
    payload
  );
};
export const getOrderId = (chatPaymentId: string, totalAmount: string): Promise<any> => {
  return axios.post(`/userauth/subscription/razorpay/chat-payment/initiate/${chatPaymentId}/${totalAmount}`);
};
export const addPaymentInitiatApi = (payload: any): Promise<any> => {
  return axios.post(`/master-service/chat-payment/add`,
    payload
  );
};
export const addPaymentUpdateApi = (payload: any): Promise<any> => {
  return axios.put(`/master-service/chat-payment/update`,
    payload
  );
};
export const updateAppointmentStatus = (status: string, payload: any): Promise<any> => {
  return axios.post(`/custom-booking-service/online-appointment/payment-cancel/${status}`,
    payload
  );
};
export const deleteAddress = (addressId: string): Promise<any> => {
  return axios.delete(`/provider-service/delete/address/${addressId}`);
};
export const getRelations = async (): Promise<any> => {
  return axios.get(`/master-service/master/patient/relation/active`);
};
export const addFamilyMember = (patientAppUserId: string, addFamilyMemberRequestDto: any): Promise<any> => {
  return axios.post('/patient-service/patient/' + patientAppUserId + '/family', addFamilyMemberRequestDto);
};