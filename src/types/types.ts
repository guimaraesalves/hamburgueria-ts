export interface IProduct {
    image: string;
    name: string;
    category: string;
    price: number;
    id: number;
    userId: number;
  }
  
  export interface IUserDataSignUp {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface IUserDataSignIn {
    email: string;
    password: string;
  }
  