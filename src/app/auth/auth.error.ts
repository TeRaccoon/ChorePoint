import { AuthErrorType } from './auth.types';

export const AUTH_ERROR_MAP: Record<number, AuthErrorType> = {
  401: AuthErrorType.InvalidCredentials,
  0: AuthErrorType.NetworkError,
};

export const getAuthErrorMessage = (errorType: AuthErrorType): string => {
  switch (errorType) {
    case AuthErrorType.InvalidCredentials:
      return 'Invalid credentials';
    case AuthErrorType.NetworkError:
      return 'Network error';
    case AuthErrorType.LoginFailed:
      return 'Login failed';
    default:
      return 'An unknown error occurred';
  }
};
