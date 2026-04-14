export enum AuthErrorType {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  NetworkError = 'NETWORK_ERROR',
  LoginFailed = 'LOGIN_FAILED',
}

export class AuthError extends Error {
  constructor(public type: AuthErrorType) {
    super(type);
  }
}
