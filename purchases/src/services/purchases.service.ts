import { Injectable } from '@nestjs/common';
import { PurchaseStatus } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreatePurchaseDTO = {
  status?: PurchaseStatus;
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllPurchasesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId, status }: CreatePurchaseDTO) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) throw new Error('Customer does not exist');

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) throw new Error('Product does not exist');

    return this.prisma.purchase.create({
      data: {
        status,
        customer: {
          connect: {
            id: customerId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }
}
