export interface InputField {
  id: string;
  name: string;
  placeholder: string;
  type: 'number';
  defaultValue?: string;
}

export interface Calculator {
  id: string;
  name: string;
  description?: string;
  inputs: InputField[];
  formula: string;
  createdAt: number;
  updatedAt: number;
}