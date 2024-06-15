import { Router, Request, Response } from 'express';
import RegisterService from '../services/register.service';
import UserEntity from '../entities/user.entity';
import bcrypt from 'bcrypt';

// Função de validação para o CEP
const validateCep = (cep: string): boolean => {
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
  return cepRegex.test(cep);
};

// Função de validação para o e-mail
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função de validação para a senha
const validatePassword = (password: string): boolean => {
  return password.length >= 6; // mínimo de 6 caracteres
};

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

    if (!name || !email || !gender || !paymentMethod || !cpf || !cep || !password || !recoveryQuestion) {
      return res.status(400).json({
        msg: 'All fields are required',
      });
    }

    if (!validateCep(cep)) {
      return res.status(400).json({
        msg: 'Invalid CEP format',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        msg: 'Invalid email format',
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        msg: 'Invalid password. The password must be at least 6 characters long.',
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // hash the password

      const newUser = await this.registerService.createUser(new UserEntity({
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
        msg: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'An unexpected error occurred',
      });
    }
  }

  private async getUsers(req: Request, res: Response) {
    try {
      const users = await this.registerService.getUsers();
      return res.status(200).json({
        msg: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'An unexpected error occurred',
      });
    }
  }

  private async getUser(req: Request, res: Response) {
    try {
      const user = await this.registerService.getUser(req.params.id);
      return res.status(200).json({
        msg: 'User retrieved successfully',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'An unexpected error occurred',
      });
    }
  }

  private async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await this.registerService.updateUser(req.params.id, new UserEntity(req.body));
      return res.status(200).json({
        msg: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'An unexpected error occurred',
      });
    }
  }

  private async deleteUser(req: Request, res: Response) {
    try {
      await this.registerService.deleteUser(req.params.id);
      return res.status(200).json({
        msg: 'User deleted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'An unexpected error occurred',
      });
    }
  }
}

export default RegisterController;
