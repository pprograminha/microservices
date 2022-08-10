import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field(() => ID)
  id: string;

  @Field()
  productId: string;
}
