import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Customer as CustomerFromDB, Prisma } from '@prisma/client';

import { PrismaService } from '@ocmi/api/libs/database/prisma/prisma.service';

import { Customer } from '../domain/customer';
import { CustomerRepository } from '../domain/customer.repository';
import { CustomerFactory } from '../domain/customer.factory';
import { Roles } from '../../auth/interface/roles/constants';

type CustomerEntity = CustomerFromDB & {
  user: {
    email: string;
    password: string;
  };
};

@Injectable()
export class CustomerRepositoryImplementation implements CustomerRepository {
  constructor(
    private readonly customerFactory: CustomerFactory,
    private readonly prisma: PrismaService,
  ) {}

  async exists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return !!user;
  }

  async create(customer: Customer): Promise<void> {
    const role = await this.prisma.role.findFirst({
      where: { name: Roles.Customer },
    });

    if (!role) {
      throw new InternalServerErrorException('Role not found');
    }

    await this.prisma.customer.create({
      data: this.modelToEntity(customer, role.id),
    });
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      include: { user: true },
    });

    return customers.map((customer) => this.entityToModel(customer));
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!customer) {
      return null;
    }

    return this.entityToModel(customer);
  }

  async update(customer: Customer): Promise<void> {
    await this.prisma.customer.update({
      where: { id: customer.getId() },
      data: {
        businessName: customer.getBusinessName(),
      },
    });
  }

  private modelToEntity(
    customer: Customer,
    roleId: string,
  ): Prisma.CustomerCreateInput {
    return {
      businessName: customer.getBusinessName(),
      user: {
        create: {
          email: customer.getEmail(),
          password: customer.getPassword(),
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      },
    };
  }

  private entityToModel(entity: CustomerEntity): Customer {
    return this.customerFactory.reconstituteCustomer({
      id: entity.id,
      businessName: entity.businessName,
      email: entity.user.email,
      password: entity.user.password,
    });
  }
}
