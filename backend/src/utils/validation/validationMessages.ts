export enum ValidationMessages {
  REQUIRED_FIELDS = 'All fields are required',
  INVALID_CEP = 'Invalid CEP format',
  INVALID_EMAIL = 'Invalid email format',
  INVALID_PASSWORD = 'Invalid password. The password must be at least 6 characters long.',
  USER_CREATED_SUCCESS = 'User created successfully',
  USER_RETRIEVED_SUCCESS = 'User retrieved successfully',
  USERS_RETRIEVED_SUCCESS = 'Users retrieved successfully',
  USER_UPDATED_SUCCESS = 'User updated successfully',
  USER_DELETED_SUCCESS = 'User deleted successfully',
  UNEXPECTED_ERROR = 'An unexpected error occurred',
  EMAIL_ALREADY_EXISTS = 'User with this email already exists',
  CPF_ALREADY_EXISTS = 'User with this CPF already exists',
}
