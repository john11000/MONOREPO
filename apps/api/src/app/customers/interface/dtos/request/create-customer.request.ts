import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateCustomerRequestDto {
  @IsString({ message: 'Business name must be a string' })
  @ApiProperty({ type: String, description: 'The name of the business' })
  businessName: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @ApiProperty({ type: String, description: 'The email of the customer' })
  email: string;

  @IsStrongPassword(
    {
      minSymbols: 0,
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be at least 4 characters and contain at least one uppercase letter, one lowercase letter, and one number',
    },
  )
  @ApiProperty({ type: String, description: 'The password of the customer' })
  password: string;
}
