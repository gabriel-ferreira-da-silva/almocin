import BaseEntity from "./base.entity";
import { v4 as uuidv4 } from 'uuid';

export default class UserEntity extends BaseEntity {
  name: string;
  email: string;
  gender: string;
  cpf: string;
  cep: string;
  password: string;
  paymentMethod: string;
  recoveryQuestion: string;

  constructor(data: Partial<UserEntity>) {
    super(data.id || uuidv4()); 
    this.name = data.name!;
    this.email = data.email!;
    this.gender = data.gender!;
    this.cpf = data.cpf!;
    this.cep = data.cep!;
    this.password = data.password!;
    this.paymentMethod = data.paymentMethod!;
    this.recoveryQuestion = data.recoveryQuestion!;
  }
}
