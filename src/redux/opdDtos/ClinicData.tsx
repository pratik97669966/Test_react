export interface ClinicDTO {
  entityId: string;
  name: string;
  entityAddress: string;
  entityMappedToIndiClinic: boolean;
  individualClinicAppId: string | null;
  appDownloadLink: string | null;
  uniqueEntityNumber: string;
}
