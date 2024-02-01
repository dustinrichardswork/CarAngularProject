//This structure is saved to local storage after login
//Contains information about currently logged in user

import { UserRoles } from "../enums";

export class LoginData {
  authToken: string;
  refreshToken: string;
  userName: string;
  expiresOn: number;
  role: UserRoles;
  profile?: any;
}
