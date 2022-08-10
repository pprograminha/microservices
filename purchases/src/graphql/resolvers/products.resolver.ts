import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
