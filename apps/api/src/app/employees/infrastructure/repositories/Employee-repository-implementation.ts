import { Injectable } from '@nestjs/common';
import { Employee as EmployeeEntity, Prisma } from '@prisma/client';

import { PrismaService } from '@ocmi/api/libs/database/prisma/prisma.service';

import { Employee } from '../../domain/employee';
import { EmployeeRepository } from '../../domain/employee.repository';
import { EmployeeFactory } from '../../domain/employee-factory';

@Injectable()
export class EmployeeRepositoryImplementation implements EmployeeRepository {
  constructor(
    private readonly employeeFactory: EmployeeFactory,
    private readonly prisma: PrismaService,
  ) {}

  async create(employee: Employee): Promise<void> {
    await this.prisma.employee.create({
      data: this.modelToEntity(employee),
    });
  }

  async update(employee: Employee): Promise<void> {
    await this.prisma.employee.update({
      where: { id: employee.getId() },
      data: this.modelToEntity(employee),
    });
  }

  async delete(employee: Employee) {
    await this.prisma.employee.delete({
      where: { id: employee.getId() },
    });
  }

  async findAll(customerId: string): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany({
      where: { customerId },
    });

    return employees.map((employee) => this.entityToModel(employee));
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return null;
    }

    return this.entityToModel(employee);
  }

  private modelToEntity(employee: Employee): Prisma.EmployeeCreateInput {
    return {
      id: employee.getId(),
      name: employee.getName(),
      payType: employee.getPayType(),
      payRate: employee.getPayRate(),
      customer: {
        connect: {
          id: employee.getCustomerId(),
        },
      },
    };
  }

  private entityToModel(entity: EmployeeEntity): Employee {
    return this.employeeFactory.reconstituteEmployee({
      id: entity.id,
      name: entity.name,
      payType: entity.payType,
      payRate: entity.payRate.toNumber(),
      customerId: entity.customerId,
    });
  }
}
