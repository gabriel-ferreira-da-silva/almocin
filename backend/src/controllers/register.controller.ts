import { Router, Request, Response } from 'express';
import RegisterService from '../services/register.service';
import UserEntity from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { validateCep, validateEmail, validatePassword, validateRequiredFields } from '../utils/validation/validation';
import { ValidationMessages } from '../utils/validation/validationMessages';
import { HttpBadRequestError } from '../utils/errors/http.error';

class RegisterController {
  private prefix: string = '/register';
  public router: Router;
  private registerService: RegisterService;

  constructor(router: Router, registerService: RegisterService) {
    this.router = router;
    this.registerService = registerService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.prefix, (req: Request, res: Response) => this.createUser(req, res));
    this.router.get(this.prefix, (req: Request, res: Response) => this.getUsers(req, res));
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) => this.getUser(req, res));
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) => this.updateUser(req, res));
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) => this.deleteUser(req, res));
  }

  private async createUser(req: Request, res: Response) {
    const { name, email, gender, paymentMethod, cpf, cep, password, recoveryQuestion } = req.body;

    const fieldsToValidate = { name, email, gender, paymentMethod, cpf, cep, password, recoveryQuestion };

    if (!validateRequiredFields(fieldsToValidate)) {
      return res.status(400).json({
        msg: ValidationMessages.REQUIRED_FIELDS,
      });
    }

    if (!validateCep(cep)) {
      return res.status(400).json({
        msg: ValidationMessages.INVALID_CEP,
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        msg: ValidationMessages.INVALID_EMAIL,
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        msg: ValidationMessages.INVALID_PASSWORD,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // hash the password

      const newUser = await this.registerService.createUser(new UserEntity({
        id: '', // id will be generated by the service
        name,
        email,
        gender,
        paymentMethod,
        cpf,
        cep,
        password: hashedPassword, // use the hashed password
        recoveryQuestion,
      }));

      return res.status(201).json({
        msg: ValidationMessages.USER_CREATED_SUCCESS,
        data: newUser,
      });
    } catch (error) {
      const msgCode = (error as HttpBadRequestError).msgCode;
      if (msgCode === ValidationMessages.EMAIL_ALREADY_EXISTS) {
        return res.status(400).json({
          msg: ValidationMessages.EMAIL_ALREADY_EXISTS,
        });
      }

      if (msgCode === ValidationMessages.CPF_ALREADY_EXISTS) {
        return res.status(400).json({
          msg: ValidationMessages.CPF_ALREADY_EXISTS,
        });
      }

      return res.status(500).json({
        msg: ValidationMessages.UNEXPECTED_ERROR,
      });
    }
  }

  private async getUsers(req: Request, res: Response) {
    try {
      const users = await this.registerService.getUsers();
      return res.status(200).json({
        msg: ValidationMessages.USERS_RETRIEVED_SUCCESS,
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: ValidationMessages.UNEXPECTED_ERROR,
      });
    }
  }

  private async getUser(req: Request, res: Response) {
    try {
      const user = await this.registerService.getUser(req.params.id);
      return res.status(200).json({
        msg: ValidationMessages.USER_RETRIEVED_SUCCESS,
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: ValidationMessages.UNEXPECTED_ERROR,
      });
    }
  }

  private async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await this.registerService.updateUser(req.params.id, new UserEntity(req.body));
      return res.status(200).json({
        msg: ValidationMessages.USER_UPDATED_SUCCESS,
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: ValidationMessages.UNEXPECTED_ERROR,
      });
    }
  }

  private async deleteUser(req: Request, res: Response) {
    try {
      await this.registerService.deleteUser(req.params.id);
      return res.status(200).json({
        msg: ValidationMessages.USER_DELETED_SUCCESS,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: ValidationMessages.UNEXPECTED_ERROR,
      });
    }
  }
}

export default RegisterController;