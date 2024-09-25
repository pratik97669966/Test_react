import * as React from 'react';

import { ArrayUtils } from '../utils/ArrayUtils';

// an object with all permissions
enum componentType {
    DURATION_STEPPER = 'DURATION_STEPPER',
}

// rules describing what roles have what permissions
const rules = {
  [componentType.DURATION_STEPPER]: {
    show : ['speciality1', 'speciality1'],
    hide : ['speciality13', 'speciality1'],
  },
};

interface SpecialityBasedHOCProps{
    children : React.ReactNode;
    no : React.ReactNode;
    component : componentType;
}

const SpecialityBasedHOC = (props : SpecialityBasedHOCProps) => {  
  //get current specialies of doctor first somehow from redux
  const currentSpecilities = ['sp1', 'sp2'];
  
  const ruleForComponent = rules[componentType.DURATION_STEPPER];

  if(ruleForComponent.show.includes('all') || ArrayUtils.isSubsetOf(ruleForComponent.show, currentSpecilities)){
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return props.no;    
};

export default SpecialityBasedHOC;
