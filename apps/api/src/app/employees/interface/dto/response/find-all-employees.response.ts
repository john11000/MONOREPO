import { ApiProperty } from '@nestjs/swagger';
import { FindAllEmployeesResult } from '../../../application/queries/find-all-employees/find-all-employees.result';

class Employee {
  @ApiProperty({ description: 'Employee id', example: 'asdf1234' })
  id: string;

  @ApiProperty({ description: 'Employee name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Employee pay type', example: 'hourly' })
  payType: string;

  @ApiProperty({ description: 'Employee pay rate', example: 10.0 })
  payRate: number;
}

export class FindAllEmployeesResponseDto extends FindAllEmployeesResult {
  @ApiProperty({ description: 'List of employees', type: [Employee] })
  employees: Employee[];
}
