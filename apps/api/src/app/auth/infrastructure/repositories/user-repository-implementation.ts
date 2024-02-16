import { Injectable } from '@nestjs/common';
import { User as UserFromDb, Role, Customer } from '@prisma/client';

import { PrismaService } from '@ocmi/api/libs/database/prisma/prisma.service';

import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { UserFactory } from '../../domain/user.factory';

type UserEntity = UserFromDb & {
  role: Role;
  customer: Customer | null;
};

@Injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly prisma: PrismaService,
  ) {}

  async findOne(query: { email: string }): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: query,
      include: { customer: true, role: true },
    });

    if (!user) {
      return null;
    }

    return this.entityToModel(user);
  }

  private entityToModel(user: UserEntity): User {
    return this.userFactory.reconstituteUser({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role.name,
      customerId: user.customer?.id || null,
    });
  }
}
