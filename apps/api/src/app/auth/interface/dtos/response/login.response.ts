import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../roles/constants';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjI5MzIwNzIyLCJleHAiOjE2MjkzMjA3MjJ9.3Z',
  })
  accessToken: string;

  @ApiProperty({ example: Roles.Customer })
  role: string;

  @ApiProperty({ example: 'test@test.co' })
  email: string;
}
