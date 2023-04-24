type ServiceResponseStatus = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'SUCCESSFUL' | 'CONFLICT';

export type ServiceMessage = { message: string }

export type ServiceResponse<T> = {
  status: ServiceResponseStatus,
  data: T
};
