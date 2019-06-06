import { IBaseItem } from './base-item.interface';
import { IEmployeeSkill } from './skill.interface';
import { IUSAddress } from './address.interface';

export interface IEmployee extends IBaseItem {
  bio: IEmployeeBio;
  contact: IEmployeeContact;
  skills: IEmployeeSkill[];
}

export interface IEmployeeBio {
  firstName: string;
  middleName?: string; // optional
  lastName: string;
  birthDate: Date; // date mask, should be over 18?
  gender: GENDER; // radio buttons
  ethnicity: ETHNICITY; // drop-down
  usCitizen: boolean; // check-box
}

export interface IEmployeeContact {
  email: string; // with validation
  phoneNumber: string; // input mask
  address: IUSAddress; // with validation
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum ETHNICITY {
  CAUCASIAN= 'CAUCASIAN', // or Eurpoean
  HISPANIC = 'HISPANIC', // or Latino
  AMERICAN_INDIAN = 'AMERICAN_INDIAN', // or Native Alaskan
  ASIAN = 'ASIAN', // or Pacific Islander
  BLACK = 'BLACK', // or African American
  DECLINED = 'DECLINED', // Prefer not to say
  OTHER = 'OTHER' // Requires specifying in text box?
}
