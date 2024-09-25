export interface QueueData {
  bookingQueueId: string;
  doctorQueueResource: DoctorQueueResource | null;
  entityId: string | null;
  entityQueueResource: EntityQueueResource | null;
  queueWithType: string | null;
  customBooking: boolean | null;
}
export interface EntityQueueResource {
  entityId: any;
  conductedBy: string;
  entityQueueTypeId: string;
  name: string;
}

export interface DoctorQueueResource {
  doctorFullName: string;
  doctorId: string;
  name: string;
  primaryDegreeName: string;
  primarySpecialityName: string;
  s3DoctorPhotoPath: string;
}