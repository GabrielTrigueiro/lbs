export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResp {
  accesToken: string;
  isAuthenticated: boolean;
  message: string;
  type: string;
}