export enum ResponseDescription {
  CREATED = 'The request has been fulfilled',
  BAD_REQUEST = 'The request is not valid',
  NOT_FOUND = 'No accounts found matching the Email',
  UNAUTHORIZED = 'Authentication failed',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred inside the server',
}
