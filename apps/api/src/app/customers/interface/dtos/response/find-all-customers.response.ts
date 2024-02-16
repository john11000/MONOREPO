import { ApiProperty } from '@nestjs/swagger';

import { FindAllCustomersResult } from '../../../application/queries/find-all-customers/find-all-customers.result';

class Customer {
  @ApiProperty({ description: 'Customer id', example: 'asdf1234' })
  id: string;

  @ApiProperty({ description: 'Customer business name', example: 'John Doe' })
  businessName: string;

  @ApiProperty({ description: 'Customer email', example: 'customer@test.co' })
  email: string;
}

export class FindAllCustomersResponseDto extends FindAllCustomersResult {
  @ApiProperty({ description: 'List of customers', type: [Customer] })
  customers: Customer[];
}
