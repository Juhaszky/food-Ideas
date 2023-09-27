export interface User {
  email: string;
  password: string;
  nickName: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
  birth: Date | undefined;
}
