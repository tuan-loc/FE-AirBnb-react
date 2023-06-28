import { baseService } from "./baseService";
export class AuthService extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  signup = (data) => {
    return this.post(`/api/auth/signup`, data);
  };

  signin = (data) => {
    return this.post(`/api/auth/signin`, data);
  };
}

export const auth = new AuthService();
