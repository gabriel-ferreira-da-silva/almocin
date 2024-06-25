export const validateCep = (cep: string): boolean => {
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
  return cepRegex.test(cep);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6; // mínimo de 6 caracteres
};

export const validateRequiredFields = (fields: { [key: string]: any }): boolean => {
  for (const key in fields) {
    if (!fields[key]) {
      return false;
    }
  }
  return true;
};