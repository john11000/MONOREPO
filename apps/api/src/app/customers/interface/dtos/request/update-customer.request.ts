import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCustomerRequestDto {
  @IsString({ message: 'Business name must be a string' })
  @ApiProperty({ type: String, description: 'The name of the business' })
  businessName: string;
}
