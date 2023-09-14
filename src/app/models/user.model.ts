export interface User {
  email: string;
  password: string;
  address: string | undefined;
  phoneNumber: string | undefined;
  birth: Date | undefined;
}
