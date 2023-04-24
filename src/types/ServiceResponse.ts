type ServiceResponseStatus = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'SUCCESSFUL';

export type ServiceMessage = { message: string }

export type ServiceResponse<T> = {
  status: ServiceResponseStatus,
  data: T
};
