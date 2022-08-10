import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { PurchasesResolver } from './resolvers/purchases.resolver';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersService } from 'src/services/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    PurchasesResolver,
    ProductsResolver,
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
