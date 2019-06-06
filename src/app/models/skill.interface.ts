import { IBaseItem } from './base-item.interface';

// Maps Employee to skill, with additional data
export interface IEmployeeSkill extends IBaseItem {
  skill: ISkill;
  proficiency: PROFICIENCY;
  primary: boolean;
}

export interface ISkill extends IBaseItem { // Managed by Admin
  name: string;
  category: ICategory;
}

export interface ICategory extends IBaseItem { // Managed by Admin
  name: string;
}

// Basic Enum, not managed by Admin
export enum PROFICIENCY {
  LOW = 'LOW',
  MID = 'MID',
  HIGH = 'HIGH'
}
