import UserEntity from '../entities/user.entity';
import BaseModel from './base.model';

export default class UserModel extends BaseModel {
  name: string;
  email: string;
  gender: string;
  cpf: string;
  cep: string;
  password: string;
  paymentMethod: string;
  recoveryQuestion: string;

  constructor(data: UserEntity) {
    super(data.id || '');
    this.name = data.name;
    this.email = data.email;
    this.gender = data.gender;
    this.cpf = data.cpf;
    this.cep = data.cep;
    this.password = data.password;
    this.paymentMethod = data.paymentMethod;
    this.recoveryQuestion = data.recoveryQuestion;
  }
}
