export enum ResponseDescription {
  OK = 'The request was successful',
  CREATED = 'The timesheet was created',
  UPDATED = 'The timesheet was updated',
  DELETED = 'The timesheet was deleted',
  BAD_REQUEST = 'The request is not valid',
  NOT_FOUND = 'No timesheet was found',
  UNAUTHORIZED = 'Authentication failed',
  FORBIDDEN = 'The client does not have permission to access the requested resource',
  UNPROCESSABLE_ENTITY = 'The server understood the request and the syntax is correct, but could not fulfill the request',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred inside the server',
}
