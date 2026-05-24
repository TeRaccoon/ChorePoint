import { Observable, of, throwError } from 'rxjs';
import { RequestState } from '../types/interfaces/request-state';
import { ApiResponse } from './dtos/response';

export function mapSuccess<T>(response: ApiResponse<T>): RequestState<T> {
  return {
    isLoading: false,
    data: response.data,
    message: response.message,
    success: response.success,
  };
}

export function mapError<T>(fallback: T | null) {
  return (err: any): Observable<RequestState<T>> => {
    if (err.status === 404) {
      return of({
        isLoading: false,
        data: fallback,
        message: err?.message ?? '',
        success: false,
      });
    }

    return throwError(() => err);
  };
}
