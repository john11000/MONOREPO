export enum ResponseDescription {
  OK = 'The request was successful',
  CREATED = 'The resource was created or the operation not guaranteed to be idempotent succeeded',
  UPDATED = 'The resource was updated',
  DELETED = 'The resource was deleted',
  BAD_REQUEST = 'The request is not valid',
  NOT_FOUND = 'No resource found matching the given data',
  UNAUTHORIZED = 'Authentication failed',
  FORBIDDEN = 'The client does not have permission to access the requested resource',
  UNPROCESSABLE_ENTITY = 'The server understood the request and the syntax is correct, but could not fulfill the request',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred inside the server',
}
