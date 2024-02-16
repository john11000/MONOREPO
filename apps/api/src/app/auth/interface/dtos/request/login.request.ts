import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'customer@test.co', description: 'Email' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: 'customer', description: 'Password' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  password: string;
}
