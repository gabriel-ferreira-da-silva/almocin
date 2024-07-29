import { Dispatch } from "react";
import { ForgotPasswordStateAction, ForgotPasswordStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { ForgotPasswordType , ForgotPasswordSchema } from "../../forms/ForgotPasswordForm";

export default class ForgotPasswordService {
  private apiService: ApiService;
  private dispatch: Dispatch<ForgotPasswordStateAction>;
  private prefix = "/forgot-password";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<ForgotPasswordStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async requestForgotPassword(formData: ForgotPasswordType ): Promise<void> {
    this.dispatch({
      type: ForgotPasswordStateType.REQUEST,
      payload: RequestStatus.loading<void>(), // Corrigido para fornecer o tipo correto
    });

    try {
      // Valida o formulário antes de fazer a solicitação
      ForgotPasswordSchema.parse(formData);

      const result = await this.apiService.post(this.prefix, formData);

      result.handle({
        onSuccess: () => {
          this.dispatch({
            type: ForgotPasswordStateType.SUCCESS,
            payload: RequestStatus.success<void>(undefined), // Corrigido para fornecer o tipo correto
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: ForgotPasswordStateType.ERROR,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (error) {
      // Se a validação falhar, atualizar o estado com um erro
      this.dispatch({
        type: ForgotPasswordStateType.ERROR,
        payload: RequestStatus.failure(error),
      });
    }
  }
}
