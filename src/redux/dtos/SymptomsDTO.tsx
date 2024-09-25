
export interface SymptomResourceDTO {
    id?: string;
    symptomId?: string;
    symptomName?: string;
    severity: string[];
    characteristics: string[];
    doctorId?: string;
    selectedSeverity?: string;
    selectedCharacteristics?: any[];
    specialCharacteristics?: any;
    duration?: string;
    durationType?: SegmentOption;
    durationUnit: string;
    active?: boolean;
    favourite?: boolean;
    note?: string;
    selectedMoreOptions?: SelectedMoreOption[];
    cmsMoreOptions?: CmsMoreOption[];
    isUpdated?: boolean;
    // _links?: Links;
}
export interface SelectedMoreOption {
    optionDetails?: string[];
    title?: string;
}
export interface CmsMoreOption {
    optionDetails?: string[];
    title?: string;
}
export interface SegmentOption {
    title: string;
    value: string;
    large?: boolean;
    days?: number;
  }