export interface InitiatePaymentPayload {
    chatPaymentId?: string;
    chatStatus?: string;
    doctorId?: string; // Assuming selectedDoctor?.doctorId can be undefined
    patientId?: string; // Assuming selfData?.userId can be undefined
    paymentStatus?: string;
    transactionDate?: number;
    patientMobileNumber?: number; // Assuming onlineConsultationBookingBean.parentPatientMobileNumber can be string or number
    totalAmount?: number;
    timeSlotId?: string;
    summaryId?: string; // Assuming onlineConsultationBookingBean.slotSummaryId can be undefined
    paymentMode?: string;
    razorPayOrderId?: string;
    bookingSlotDatePerUTC?: string;
}