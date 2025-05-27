import { UserType } from './user-type.model';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  userType: UserType;
}