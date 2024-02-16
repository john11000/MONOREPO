import * as bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';

import { Roles } from './apps/api/src/app/auth/interface/roles/constants';

const prisma = new PrismaClient();

async function main() {
  const rolesToCreate: Prisma.RoleCreateInput[] = [
    {
      name: Roles.Admin,
      description: 'Admin role',
    },
    {
      name: Roles.Customer,
      description: 'Customer role',
    },
  ];

  await prisma.role.createMany({
    data: rolesToCreate,
  });

  const adminRole = await prisma.role.findFirst({
    where: { name: Roles.Admin },
  });

  const customerRole = await prisma.role.findFirst({
    where: { name: Roles.Customer },
  });

  await prisma.customer.create({
    data: {
      businessName: 'Customer Test',
      user: {
        create: {
          email: 'customer@test.co',
          password: await bcrypt.hash('customer', 10),
          roleId: customerRole?.id || '',
        },
      },
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@test.co',
        password: await bcrypt.hash('admin', 10),
        roleId: adminRole?.id || '',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
