import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { slugify } from 'src/utils/slugify';

type CreateProductDTO = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async getProductBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: {
        slug,
      },
    });
  }

  async createProduct({ title }: CreateProductDTO) {
    const slug = slugify(title);

    const productWithSameSlug = await this.getProductBySlug(slug);

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
