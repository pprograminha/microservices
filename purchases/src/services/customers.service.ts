import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateCustomerDTO = {
  authUserId: string;
};

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllCustomers() {
    return this.prisma.customer.findMany();
  }

  async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async getCustomerById(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerDTO) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
