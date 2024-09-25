export interface BookingRequest {
  id: string;
  parentPatientId: string | null;
  parentPatientMobileNumber: string | null;
  bookedFamilyMemberId: string | null;
  bookedFamilyMemberMobileNumber: string | null;
  bookedFamilyMemberFirstName: string | null;
  bookedFamilyMemberLastName: string | null;
  bookingSlotDatePerUTC: number;
  bookingInitiatedThrough: string | null;
  checkUpType: string | null;
  doctorFullName: string | null;
  doctorId: string | null;
  location: string | null;
  paymentStatus: string | null;
  bookingSlotDateAsFormattedStringPerIST: string;
  bookingStatus: string;
  indiClinicAppId: string | null;
  bookingPosition: number;
  slotFilled: boolean;
  startTime: number;
  endTime: number;
  atHomeServiceBooking: boolean;
  createdBy: string | null;
  createdAt: string | null;
  lastModified: string | null;
  lastModifiedBy: string | null;
}

export interface MainSlotInfoWithRequest {
  id: string;
  slotName: string;
  mainSlotOnlineConsultationId: string;
  opdStartTimeSecsFromMidnight: number;
  opdEndTimeSecsFromMidnight: number;
  averageCheckupTime: string | null;
  onlineBookingRequests: BookingRequest[];
  switchOff: boolean;
}

export interface SlotSummary {
  slotSummaryId: string;
  doctorId: string;
  status: string | null;
  statusInfo: string | null;
  opdSlotStatus: string;
  bookingSlotDatePerUTC: number;
  totalNoOfBookingsAllowed: number;
  totalNoOfBookingsMade: number;
  mainSlotInfoWithRequest: MainSlotInfoWithRequest;
}
