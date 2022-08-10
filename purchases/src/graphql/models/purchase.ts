import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Customer } from './customer';
import { Product } from './product';

export enum PurchaseStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  @Field(() => Customer)
  customer: Customer;

  productId: string;
  customerId: string;
}
