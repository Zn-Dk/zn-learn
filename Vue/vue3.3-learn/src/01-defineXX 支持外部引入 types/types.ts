export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface InputPayload {
  index: number;
  password: string;
}

export interface IChildEmits {
  (event: 'change', payload: InputPayload): void;
  (event: 'save', payload: InputPayload): void;
}
