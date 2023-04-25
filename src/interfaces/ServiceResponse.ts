type ServiceResponseStatus = 'invalidData'
| 'unauthorized'
| 'notFound'
| 'successful'
| 'conflict'
| 'internalServerError';

export type ServiceMessage = { message: string };

export type ServiceResponse<T> = {
  status: ServiceResponseStatus,
  data: T
};
