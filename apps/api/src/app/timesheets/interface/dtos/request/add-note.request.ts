import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddNoteRequestDto {
  @ApiProperty({
    description: 'notes',
    example: 'This is a note',
  })
  @IsString({ message: 'notes must be a string' })
  @IsNotEmpty({ message: 'notes is required' })
  notes: string;
}
