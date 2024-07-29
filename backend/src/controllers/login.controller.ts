import { Router, Request, Response } from 'express';
import LoginService from '../services/login.service';
import { HttpError } from '../utils/errors/http.error';
import limiterMiddleware from '../core/limiter';
import { FailureResult, Result, SuccessResult } from '../utils/result';

class LoginController {
  public prefix: string = '/login';
  public router: Router;
  private loginService: LoginService;

  constructor(router: Router, loginService: LoginService) {
    this.router = router;
    this.loginService = loginService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(limiterMiddleware)
    this.router.post(this.prefix, (req: Request, res: Response) => this.login(req, res));
    this.router.post(`${this.prefix}/logout`, (req: Request, res: Response) => this.logout(req, res));
    this.router.post(`${this.prefix}/forgot-password`, (req: Request, res: Response) => this.forgotPassword(req, res));
  }

  private async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return new FailureResult({
        msg: 'Email and password are required',
        code: 400
      }).handle(res);
    }

    try {
      const token = await this.loginService.login(email, password);

      res.cookie('session_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return new SuccessResult({ msg: 'Login successful', data: { token } }).handle(res);
    } catch (error) {
      if (error instanceof HttpError) {
        return new FailureResult({ msg: error.msg, code: 400 }).handle(res);
      } else {
        return new FailureResult({ msg: 'An unexpected error occurred' }).handle(res);
      }
    }
  }

  private logout(req: Request, res: Response) {
    res.clearCookie('session_token');
    return new SuccessResult({
      msg: 'Logout successful',
      data: Result.transformRequestOnMsg(req)
    }).handle(res);
  }

  private async forgotPassword(req: Request, res: Response) {
    const { email, recoveryQuestion, newPassword } = req.body;

    if (!email || !recoveryQuestion || !newPassword) {
      return new FailureResult({
        msg: 'Email, recovery question, and new password are required',
        code: 400
      }).handle(res);
    }

    try {
      await this.loginService.resetPassword(email, recoveryQuestion, newPassword);

      return new SuccessResult({ msg: 'Password reset successful' }).handle(res);
    } catch (error) {
      if (error instanceof HttpError) {
        return new FailureResult({ msg: error.msg, code: 400 }).handle(res);
      } else {
        return new FailureResult({ msg: 'An unexpected error occurred' }).handle(res);
      }
    }
  }
}

export default LoginController;
