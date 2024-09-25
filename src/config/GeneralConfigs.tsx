import { ChipOption, ChipShape } from '../components/chips/Chips';
import { SegmentOption } from '../components/toggleGroup/SegmentControl';
import { getLanguageTranslate } from '../i18n';
import afternoonIcon from './../assets/cms/afternoonIcon.svg';
import breakfastIcon from './../assets/cms/breakfastIcon.svg';
import dinnerIcon from './../assets/cms/dinnerIcon.svg';
import eveningIcon from './../assets/cms/eveningIcon.svg';
import lunchIcon from './../assets/cms/lunchIcon.svg';
import morningIcon from './../assets/cms/morningIcon.svg';
import nightIcon from './../assets/cms/nightIcon.svg';

export const getDurationQuickFixForFollowUp = () => {
  return [
    {
      title: 'NA',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '0',
    } as ChipOption,
    {
      title: '01',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '03',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
    {
      title: '05',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '5',
    } as ChipOption,
    {
      title: '07',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '7',
    } as ChipOption,
    {
      title: '10',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '10',
    } as ChipOption,
    {
      title: '15',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '15',
    } as ChipOption,
  ];
};

export const getDurationQuickFixForSymptoms = () => {
  return [
    {
      title: '01',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '03',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
    {
      title: '05',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '5',
    } as ChipOption,
    {
      title: '07',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '7',
    } as ChipOption,
    {
      title: '10',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '10',
    } as ChipOption,
    {
      title: '15',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '15',
    } as ChipOption,
  ];
};

export const getDurationQuickFixForClinicalFeatures = () => {
  return [
    {
      title: '01',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '03',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
    {
      title: '05',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '5',
    } as ChipOption,
    {
      title: '07',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '7',
    } as ChipOption,
    {
      title: '10',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '10',
    } as ChipOption,
    {
      title: '15',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '15',
    } as ChipOption,
  ];
};

export const getQuantitSet1 = () => {
  return [
    {
      title: '1',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '1.5',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1.5',
    } as ChipOption,
    {
      title: '2',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '2',
    } as ChipOption,
    {
      title: '2.5',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '2.5',
    } as ChipOption,
    {
      title: '3',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
    {
      title: '3.5',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3.5',
    } as ChipOption,
    {
      title: '4',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '4',
    } as ChipOption,
    {
      title: '4.5',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '4.5',
    } as ChipOption,
    {
      title: '5',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '5',
    } as ChipOption,
    {
      title: '7.5',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '7.5',
    } as ChipOption,
    {
      title: '10',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '10',
    } as ChipOption,
  ];
};
export const getQuantitSet2 = () => {
  return [
    {
      title: '1/3',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1/3',
    } as ChipOption,
    {
      title: '1/2',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1/2',
    } as ChipOption,
    {
      title: '3/4',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '3/4',
    } as ChipOption,
    {
      title: '1',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '1+1/2',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '1+1/2',
    } as ChipOption,
    {
      title: '2',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '2',
    } as ChipOption,
    {
      title: '2+1/2',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '2+1/2',
    } as ChipOption,
    {
      title: '3',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
  ];
};
export const getQuantitSet3 = () => {
  return [
    {
      title: '1',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '2',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '2',
    } as ChipOption,
    {
      title: '3',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
    {
      title: '4',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '4',
    } as ChipOption,
    {
      title: '5',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '5',
    } as ChipOption,
    {
      title: '6',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '6',
    } as ChipOption,
    {
      title: '7',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '7',
    } as ChipOption,
    {
      title: '8',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '8',
    } as ChipOption,
  ];
};
export const getQuantitSet4 = () => {
  return [
    {
      title: '0.2',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '0.2',
    } as ChipOption,
    {
      title: '0.5',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '0.5',
    } as ChipOption,
    {
      title: '0.7',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '0.7',
    } as ChipOption,
    {
      title: '1/4',
      variant: 'default',
      shape: ChipShape.CIRCULAR,
      data: '1/4',
    } as ChipOption,
    {
      title: '1/2',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '1/2',
    } as ChipOption,
    {
      title: '3/4',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3/4',
    } as ChipOption,
    {
      title: '1',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '1',
    } as ChipOption,
    {
      title: '3',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '3',
    } as ChipOption,
    {
      title: '5',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '5',
    } as ChipOption,
    {
      title: '7',
      variant: 'outlined',
      shape: ChipShape.CIRCULAR,
      data: '7',
    } as ChipOption,
  ];
};

export const getMedicineDurationQuickFixForMedicines = () => {
  return [
    {
      title: '1 d',
      variant: 'default',
      shape: ChipShape.ROUNDED,
      data: '1 d',
      type: 'd',
    } as ChipOption,
    {
      title: '2 d',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '2 d',
      type: 'd',
    } as ChipOption,
    {
      title: '3 d',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '3 d',
      type: 'd',
    } as ChipOption,
    {
      title: '4 d',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '4 d',
      type: 'd',
    } as ChipOption,
    {
      title: '5 d',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '5 d',
      type: 'd',
    } as ChipOption,
    {
      title: '1 w',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '1 w',
      type: 'w',
    } as ChipOption,
    {
      title: '10 d',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '10 d',
      type: 'd',
    } as ChipOption,
    {
      title: '2 w',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '2 w',
      type: 'w',
    } as ChipOption,
    {
      title: '15 d',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '15 d',
      type: 'd',
    } as ChipOption,
    {
      title: '3 w',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '3 w',
      type: 'w',
    } as ChipOption,
    {
      title: '4 w',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '4 w',
      type: 'w',
    } as ChipOption,
    {
      title: '1 m',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '1 m',
      type: 'm',
    } as ChipOption,
    {
      title: '2 m',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '2 m',
      type: 'm',
    } as ChipOption,
    {
      title: '3 m',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '3 m',
      type: 'm',
    } as ChipOption,
    {
      title: '6 m',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '6 m',
      type: 'm',
    } as ChipOption,
    {
      title: '1 y',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '1 y',
      type: 'y',
    } as ChipOption,

  ];
};

export const getOptionsForFrequency1 = () => {
  return [
    {
      title: '1',
      variant: 'default',
      shape: ChipShape.ROUNDED,
      data: '1',
    } as ChipOption,
    {
      title: '2',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '2',
    } as ChipOption,
    {
      title: '3',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '3',
    } as ChipOption,
    {
      title: '4',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '4',
    } as ChipOption,
  ];
};

export const getOptionsWithIconForFrequency1 = () => {
  return [
    {
      title: 'Morning',
      variant: 'default',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '1',
      icon: <img src={morningIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Afternoon',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '2',
      icon: <img src={eveningIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Evening',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '3',
      icon: <img src={afternoonIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Night',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '4',
      icon: <img src={nightIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
  ];
};

export const getOptionsWithIconForFrequency3 = () => {
  return [
    {
      title: 'Breakfast',
      variant: 'default',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '1',
      icon: <img src={breakfastIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Lunch',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '2',
      icon: <img src={lunchIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Dinner',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '3',
      icon: <img src={dinnerIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
  ];
};

export const getOptionsWithIconForFrequency4 = () => {
  return [
    {
      title: 'Morning',
      variant: 'default',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '1',
      icon: <img src={morningIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Afternoon',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '2',
      icon: <img src={afternoonIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Evening',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '3',
      icon: <img src={eveningIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
    {
      title: 'Night',
      variant: 'outlined',
      shape: ChipShape.RECTANGLE_WITH_ICON,
      data: '4',
      icon: <img src={nightIcon} alt={getLanguageTranslate('header.menus.home')} />,
    } as ChipOption,
  ];
};
export const getF2Segments = () => {
  return [
    {
      title: 'Day',
      value: 'day',
    } as SegmentOption,
    {
      title: 'Week',
      value: 'Week',
    } as SegmentOption,
    {
      title: 'Month',
      value: 'month',
    } as SegmentOption,
    {
      title: 'Year',
      value: 'year',
    } as SegmentOption,
  ];
};
export const getFrequencyType2QuickFix = () => {
  return [
    {
      title: '1 Time',
      variant: 'default',
      shape: ChipShape.ROUNDED,
      data: '1',
    } as ChipOption,
    {
      title: '2 Times',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '2',
    } as ChipOption,
    {
      title: '3 Times',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '3',
    } as ChipOption,
    {
      title: '4 Times',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '4',
    } as ChipOption,
    {
      title: '5 Times',
      variant: 'outlined',
      shape: ChipShape.ROUNDED,
      data: '5',
    } as ChipOption,
  ];
};